---
title: "HorizonStream: Long-Horizon Attention for Streaming 3D Reconstruction"
collection: publications
category: conferences
permalink: /publication/2026-09-01-horizon-stream
excerpt: 'Chong Cheng, Peilin Tao, Nanjie Yao, Guanzhi Ding, Xianda Chen, Yuansen Du, Xiaoyang Guo, Wei Yin, Weiqiang Ren, Qian Zhang, Zhengqing Chen, Hao Wang'
date: 2026-09-01
venue: 'Conference on Neural Information Processing Systems (NeurIPS)'
paperurl: 'https://arxiv.org/abs/2605.23889'
projecturl: 'https://3dagentworld.github.io/horizonstream/'
---

![HorizonStream framework](https://3dagentworld.github.io/horizonstream/static/images/framework.png)

HorizonStream keeps a bounded geometric state while matching nearby frames and reading out stable scale and camera pose.

# Abstract

Long video streams are difficult for 3D reconstruction systems because useful geometric evidence does not all last for the same length of time. HorizonStream separates long-range memory from local 3D matching and metric pose recovery. Its attention mechanisms retain persistent information without requiring memory to grow with the video, and the reported experiments cover sequences longer than 10,000 frames.
