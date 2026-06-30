---
title: "Course: Data Science Bootcamp #12 -Live 02 – Prompt Engineering ft. Gemini"
updated: 2026-03-14T20:57:11+07:00
tags:
  - data-science
  - bootcamp
  - course
  - note
---
Part of [[course-data-science-bootcamp-12|Course: Data Science Bootcamp #12]]
## ช่วงแรก สอน mindset

วิธีเอาตัวรอดจากยุค [[ai|AI]] ครองโลก

**“มองทุกอย่างเป็นระบบ”**

แนะนำ Thinking in system ของ Donella meadows

**Stock flow system**

- Stock – อะไรที่วัดได้
- Inflow – อะไรที่เพิ่ม stock
- Outflow - อะไรที่ลด stock

ต่อกัน กลายเป็น flow ที่บอกอัตราส่วนการเพิ่มการลด

Inflow – stock – outflow

เช่น

 Money มีอัตราได้รับและการใช้

Earn – money – spend

ปัจจุบัน คนส่วนใหญ่ ชนชั้นกลาง มีรายได้ทางเดียว คือ มาจากงานประจำ ฝากเงินธนาคาร
เป็นอะไรที่เสี่ยงมาก เพราะเราควบคุมมันไม่ได้ นายจ้าง และธนาคารเป็นคนควบคุมเม็ดเงินที่มาหาเรา
เงินเฟ้อก็กัดกินเงินเราทุกปี ปีไหนบริษัทไม่เพิ่มเงินเดือนให้ หรือเพิ่มไม่มากกว่าอัตราเงินเฟ้อ ขาดทุน

ถ้าเราถูกไล่ออก ก็จบเห่
แนะนำให้มีรายได้มาจากหลายแหล่ง หนึ่งในนั้นคือ **สร้างอะไรขึ้นมาเป็นของตัวเอง**

**“อ่านและเขียนให้เยอะ”**

การใช้ภาษาเป็นอารยธรรมที่ทำให้มนุษย์พัฒนามาจนถึงทุกวันนี้
และตอนนี้ก็ใช้สร้าง ai ที่เรียกว่า llm

น่าเสียดายที่คนสมัยนี้อ่านและเขียนน้อยลง แต่ใช้ ai มากขึ้น ซึ่งหลายครั้งใช้เพียงเพื่อความสะดวกและไม่ได้ใช้อย่างถูกวิธี เช่น ถามเอาคำตอบ สรุปเนื้อหาในหนังสือ (บางครั้งมันก็สรุปไม่ครบ)

รายงานจากอังกฤษ (มีนาคม 2025) บอกว่า 40% ไม่อ่านหนังสือมา 12 เดือน – [40% of Britons haven’t read a single book in the last 12 months | YouGov](https://yougov.co.uk/entertainment/articles/51730-40-of-britons-havent-read-a-single-book-in-the-last-12-months)

“ภาษาบ่งบอกคุณภาพของมนุษย์”

**เราทำตรงกันข้าม จะไปได้ไกลกว่า**

**“ทำงานให้ตัวเอง”**

Work harder on yourself -jim rohn

เริ่มจากสร้างกรอบชีวิตที่ดี กันสิ่งที่แย่ ๆ ออกจากชีวิต

“Do what is Right Not what is Easy”

“Your world is your playground” - สร้างธุรกิจที่ไปไกลในโลก

## ช่วงสอง ออกแบบ Prompt

อะไรที่ทำให้เราได้ Response ที่ดีกว่าคนอื่น

เราต้องส่ง

1.      Prompt
2.      Data

ที่ดีกว่าให้ AI

ใช้ความรู้ที่เรียกว่า [[prompt-engineering|Prompt Engineering]]

 ในคลาสจะใช้ [[gemini|Gemini]]
