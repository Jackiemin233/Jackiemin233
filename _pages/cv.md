---
layout: research
title: "CV"
permalink: /cv/
redirect_from:
  - /resume
---

<div class="cv-topline">
  <div>
    <p class="cv-topline__label">Curriculum vitae</p>
    <p class="cv-topline__summary">A record of my education, research, publications, and service.</p>
  </div>
  <a class="cv-download" href="{{ '/files/NanjieYao_CV_latest.pdf' | relative_url }}" download>Download PDF <span aria-hidden="true">↗</span></a>
</div>

<nav class="cv-index" aria-label="CV sections">
  <a href="#education">Education</a>
  <a href="#experience">Experience</a>
  <a href="#cv-publications">Publications</a>
  <a href="#skills">Skills</a>
  <a href="#awards">Honors</a>
  <a href="#service">Service</a>
</nav>

<section class="cv-section" id="education" aria-labelledby="cv-education-title">
  <div class="cv-section__heading"><span>01 / Background</span><h2 id="cv-education-title">Education</h2></div>
  <div class="cv-section__body cv-timeline">
    <article class="cv-entry">
      <div class="cv-entry__date">Sep 2026 — Jun 2030 <small>expected</small></div>
      <div class="cv-entry__content"><h3>Ph.D. in Artificial Intelligence</h3><p class="cv-entry__place">The Hong Kong University of Science and Technology (Guangzhou)</p><p>Supervisor: Prof. Hao Wang. Research interests: 3D computer vision and LLM agents.</p></div>
    </article>
    <article class="cv-entry">
      <div class="cv-entry__date">Sep 2021 — Jun 2025</div>
      <div class="cv-entry__content"><h3>B.S. in Network Engineering</h3><p class="cv-entry__place">Zhejiang University of Technology</p><p>GPA: 3.71/4.0 (rank 4/53). Supervisor: Prof. Sixian Chan. Honor Graduate of Jianxing Honors College.</p></div>
    </article>
    <article class="cv-entry">
      <div class="cv-entry__date">Sep — Dec 2023</div>
      <div class="cv-entry__content"><h3>Visiting Student</h3><p class="cv-entry__place">University of California, Irvine</p><p>GPA: 4.0/4.0. Academic Study Abroad Program.</p></div>
    </article>
  </div>
</section>

<section class="cv-section" id="experience" aria-labelledby="cv-experience-title">
  <div class="cv-section__heading"><span>02 / Practice</span><h2 id="cv-experience-title">Experience</h2></div>
  <div class="cv-section__body cv-timeline">
    <article class="cv-entry">
      <div class="cv-entry__date">Aug 2026 — Jan 2027</div>
      <div class="cv-entry__content"><h3>Algorithm Engineer Intern</h3><p class="cv-entry__place">Horizon Robotics · Shanghai</p><p>Video generation, world models, and vision-language-action research.</p></div>
    </article>
    <article class="cv-entry">
      <div class="cv-entry__date">Apr 2024 — Aug 2026</div>
      <div class="cv-entry__content"><h3>Research Assistant</h3><p class="cv-entry__place">HKUST (Guangzhou)</p><p>Supervisor: Prof. Hao Wang. 3D reconstruction, human animation, and human pose estimation.</p></div>
    </article>
    <article class="cv-entry">
      <div class="cv-entry__date">Aug — Sep 2025</div>
      <div class="cv-entry__content"><h3>Remote Intern</h3><p class="cv-entry__place">Texas A&amp;M University</p><p>Supervisor: Prof. Zhengzhong Tu. Human video generation.</p></div>
    </article>
    <article class="cv-entry">
      <div class="cv-entry__date">Apr — Sep 2024</div>
      <div class="cv-entry__content"><h3>Part-time Research Assistant</h3><p class="cv-entry__place">Zhejiang University of Technology</p><p>Supervisors: Prof. Zhenyu Wen and Prof. Yiming Wu. Auto-ML and neural backdoor detection and mitigation.</p></div>
    </article>
    <article class="cv-entry">
      <div class="cv-entry__date">Dec 2023 — Apr 2024</div>
      <div class="cv-entry__content"><h3>Research Assistant Intern</h3><p class="cv-entry__place">Zhejiang Lab</p><p>Supervisor: Prof. Feng Lin. 3D reconstruction.</p></div>
    </article>
  </div>
</section>

<section class="cv-section" id="cv-publications" aria-labelledby="cv-publications-title">
  <div class="cv-section__heading"><span>03 / Research</span><h2 id="cv-publications-title">Publications</h2></div>
  <div class="cv-section__body">
    <p class="cv-section__note">* Equal contribution. Submitted manuscripts are listed separately from accepted work. See the <a href="{{ '/publications/' | relative_url }}">full publications page ↗</a> for more details.</p>
    {% assign papers = site.publications | sort: 'date' | reverse %}
    <h3 class="cv-paper-group">First-author &amp; equal-contribution</h3>
    <p class="cv-paper-subgroup">Published and accepted</p>
    {% for post in papers %}{% if post.lead_author and post.category != 'manuscripts' %}{% include cv-paper.html post=post %}{% endif %}{% endfor %}
    <p class="cv-paper-subgroup">Preprints and manuscripts</p>
    {% for post in papers %}{% if post.lead_author and post.category == 'manuscripts' %}{% include cv-paper.html post=post %}{% endif %}{% endfor %}
    <h3 class="cv-paper-group">Other papers</h3>
    <p class="cv-paper-subgroup">Published and accepted</p>
    {% for post in papers %}{% if post.lead_author != true and post.category != 'manuscripts' %}{% include cv-paper.html post=post %}{% endif %}{% endfor %}
    <p class="cv-paper-subgroup">Preprints and manuscripts</p>
    {% for post in papers %}{% if post.lead_author != true and post.category == 'manuscripts' %}{% include cv-paper.html post=post %}{% endif %}{% endfor %}
  </div>
</section>

<section class="cv-section" id="skills" aria-labelledby="cv-skills-title">
  <div class="cv-section__heading"><span>04 / Toolkit</span><h2 id="cv-skills-title">Technical skills</h2></div>
  <div class="cv-section__body cv-skill-grid">
    <div class="cv-skill"><h3>Languages</h3><p>Python, Bash, C/C++, LaTeX, Markdown, Java, HTML, CSS, SQL.</p></div>
    <div class="cv-skill"><h3>Frameworks</h3><p>PyTorch, NumPy, Matplotlib, PyTorch3D, Open3D, Spring Boot, MyBatis.</p></div>
    <div class="cv-skill"><h3>Tools</h3><p>Linux, Docker, Blender, MeshLab, VS Code.</p></div>
  </div>
</section>

<section class="cv-section" id="awards" aria-labelledby="cv-awards-title">
  <div class="cv-section__heading"><span>05 / Recognition</span><h2 id="cv-awards-title">Awards &amp; honors</h2></div>
  <div class="cv-section__body">
    <ul class="cv-awards">
      <li><time datetime="2025-06">Jun 2025</time><span>Excellent Undergraduate Dissertation Project</span></li>
      <li><time datetime="2025-06">Jun 2025</time><span>Honor Graduate of Jianxing Honors College</span></li>
      <li><time datetime="2024-09">Sep 2024</time><span>Zhejiang Provincial Government Scholarship <small>top 3%</small></span></li>
      <li><time datetime="2024-09">Sep 2024</time><span>First-class Scholarship for Outstanding Students <small>top 1%</small></span></li>
      <li><time datetime="2024-09">Sep 2024</time><span>First-class Scholarship for Academic Record <small>top 1%</small></span></li>
      <li><time datetime="2023-12">Dec 2023</time><span>Huawei Intelligent Base Scholarship <small>CNY 6,000</small></span></li>
      <li><time datetime="2023-09">Sep 2023</time><span>Second-class Scholarship for Outstanding Students <small>top 8%</small></span></li>
      <li><time datetime="2023-09">Sep 2023</time><span>Second-class Scholarship for Academic Record <small>top 8%</small></span></li>
      <li><time datetime="2023-07">Jul 2023</time><span>Second Prize, National Information Security Competition for Chinese College Students</span></li>
      <li><time datetime="2023-06">Jun 2023</time><span>Second Prize, National Innovation and Entrepreneurship Competition of China</span></li>
      <li><time datetime="2022-12">Dec 2022</time><span>Third Prize, China RoboCup (Drone Track)</span></li>
    </ul>
  </div>
</section>

<section class="cv-section" id="service" aria-labelledby="cv-service-title">
  <div class="cv-section__heading"><span>06 / Community</span><h2 id="cv-service-title">Service &amp; copyright</h2></div>
  <div class="cv-section__body cv-service-grid">
    <div class="cv-service"><h3>Reviewing</h3><p>ICASSP 2026 and 2027; ICME 2025; IEEE TMM 2026.</p></div>
    <div class="cv-service"><h3>Software copyright</h3><p>A 3D Organ Medical Image Segmentation System and Method Based on Paddle-Seg Deep Learning Framework. Chinese software copyright, 2024.</p></div>
  </div>
</section>
