import ROOT as r
import numpy as np
import json
from tqdm import tqdm

ADC_TH = 1500

chain = r.TChain("tree")
chain.Add("/data/hamada/easiroc_data/test_20211225_15_*.root")
n_entries = chain.GetEntries()

for i_entry in tqdm(range(n_entries)):
    chain.GetEntry(i_entry)
    VadcHigh = np.array(chain.VadcHigh)
    hitmap_3d = []
    for i in range(8):
        ch1 = [4*i + j for j in range(4)]
        ch2 = [63 - 4*i -j for j in range(4)]
        hitmap1 = np.array([[VadcHigh[i_ch] > ADC_TH for i_ch in ch1] for _ in range(4)])
        hitmap2 = np.array([[VadcHigh[i_ch] > ADC_TH for i_ch in ch2] for _ in range(4)])
        hitmap_3d.append(hitmap1 * hitmap2.T)
    hitmap_3d = np.array(hitmap_3d)
    if np.sum(hitmap_3d) > 5:
        hitmap_3d = hitmap_3d.tolist()
        with open("json/event_{}.json".format(i_entry), 'w') as f:
            json.dump({"hit": hitmap_3d}, f, indent=4)
