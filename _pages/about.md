---
permalink: /
title: "About me"
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

## 👋 About Me

Hello! I am an undergraduate student at the School of Geospatial Engineering and Science, [Sun Yat-sen University](https://www.sysu.edu.cn). I am also a Research Assistant at [Tsinghua Shenzhen International Graduate School](https://www.sigs.tsinghua.edu.cn), [Tsinghua University](https://www.tsinghua.edu.cn), advised by [Weijia Li](https://liweijia.github.io/). My research interests include generative AI, spatial intelligence, and remote sensing with AI.

## 🔬 Research Interests

- Generative AI
- Spatial Intelligence
- Remote Sensing and AI

## 🎓 Education

- **B.S. in Remote Sensing Science and Technology**, Sun Yat-sen University (expected 2027)

## 📝 Selected Publications

{% include base_path %}

<ul class="pub-list-home">
{% for post in site.publications reversed %}
  <li>
    {% if post.pubstatus == 'Accepted to' %}<span class="venue-badge venue-badge--accepted">{{ post.venueshort | default: post.venue }}</span>{% else %}<span class="venue-badge">{{ post.venueshort | default: post.venue }}</span>{% endif %}
    <strong>{{ post.title }}</strong><br/>
    <span class="pub-meta">{{ post.citation }}</span><br/>
    {% if post.paperurl %}[<a href="{{ post.paperurl }}">Paper</a>]{% endif %}
    {% if post.bibtex %}[<a href="{{ base_path }}{{ post.url }}">BibTeX</a>]{% endif %}
  </li>
{% endfor %}
</ul>

<p>See all publications on the <a href="/publications/">Publications page</a>.</p>

## 🏅 Honors and Awards

- 2024-2025, National Scholarship, *Ministry of Education, P.R. China*
- 2023-2024, National Scholarship, *Ministry of Education, P.R. China*
- 2023-2025, First-Class Outstanding Student Scholarship, *Sun Yat-sen University*
- 2024, Provincial First Prize, National College Students Mathematical Contest in Modeling (CUMCM), *China Society for Industrial and Applied Mathematics (CSIAM)*

## 📫 Contact

- **Email:** [fanrj3@mail2.sysu.edu.cn](mailto:fanrj3@mail2.sysu.edu.cn)
- **Address:** School of Geospatial Engineering and Science, Zhuhai, Guangdong, China

---

<div style="text-align: center; margin-top: 2em;">
<!-- Replace with your ClustrMaps embed code from https://clustrmaps.com -->
<script type="text/javascript" id="clustrmaps" src="//clustrmaps.com/map_v2.js?cl=ffffff&w=300&t=n&d=Gy7MaOiC2PB76IuNyZwfrP0M2iBujBNnEkMZhVCueOU&co=2d78ad&cmo=3acc3a&cmn=ff5353&ct=ffffff"></script>
</div>
