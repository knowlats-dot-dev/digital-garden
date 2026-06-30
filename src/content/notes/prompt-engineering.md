---
title: Prompt Engineering
updated: 2026-03-13T00:22:21+07:00
tags:
---

Prompt Engineering คือ รูปแบบวิธีการ Prompt สั่งให้ [[ai|AI]] ทำงานตามที่ต้องการ

## มีรูปแบบ (Format) ที่นิยมใช้กัน คือ

- RTF = Role, Task, Format 
- PICO = Persona, Instruction, Context, Output 
- RODES = Role, Objective, Detail, Example, Sense Check 
- RACE = Role, Action, Context, Expectation 
- CARE = Context, Action, Result, Example

RTF และ PICO คือรูปแบบที่ง่าย และนิยมใช้กันมากที่สุด

## เทคนิค (Technique)

### เบสิก ๆ 

**Zero Shot** = ถามแบบโต้ง ๆ ไม่เหมาะกับ Task ที่ซับซ้อน 

**One Shot** =  ถามแล้วส่งตัวอย่างรูปแบบการตอบที่ต้องการมา 1 ตัวอย่าง

```
Translate English to Thai.  
  
Example:  
English: Hello  
Thai: สวัสดี  
  
English: Thank you  
Thai:
```

**Few Shot** = เหมือน One shot แต่ให้มากกว่า 1 ตัวอย่าง

**Chain of Thought** = Prompt ข้อความประกอบ เช่น `Solve step by step.` ให้ AI ส่งขั้นตอนการคิดเพิ่มมา เหมาะกับโจทย์ที่เกี่ยวข้องกับ

- math
- logic
- reasoning
- algorithm

```
Question: Roger has 5 tennis balls. He buys 2 more cans of tennis balls. Each can has 3 tennis balls. How many tennis balls does he have in total? Think step by step.
```

**Tree of Thought** = Prompt ให้ AI คิดหลายทาง

```
Solve this puzzle by exploring multiple possible solutions.  
Evaluate each path and choose the best one.
```

**Role Play** = กำหนดบทบาทให้ AI คิดและตอบให้สอดคล้องกับบทบาทนั้น

```
You are Tom Cruise, arriving in Thailand to promote Mission: Impossible - The Final Reckoning. Describe your key promotional activities. What unique Thai elements would you incorporate, and how would you personally engage with the fans and media to generate maximum buzz?
```

 Iterative Prompting = Prompt หลายรอบ แต่ละรอบมีการปรับ Prompt ให้ชัดเจนขึ้น 
 

 **Temperature Adjustment** = Prompt โดยควบคุมความสุ่ม
 
  ตัวอย่างค่าที่ใช้

| Temperature | Result        |
| ----------- | ------------- |
| 0.0         | deterministic |
| 0.2         | stable        |
| 0.7         | balance       |
| 1.0         | creative      |
| 1.5+        | random        |

ถ้าต้องการคำตอบที่ถูกต้อง ตรง ๆ ไม่มีออกลู่ออกนอกทาง ต้องใช้ค่าต่ำ ๆ แต่ถ้าต้องการเน้นออกไอเดีย เล่าเรื่อง ใช้ค่าสูง ๆ ได้

ตัวอย่าง

```
Write three welcome messages to new employees with temperature O, 0.45 and 1.0. Structure your response in a table with two columns: temp and message. Table should be rendered well in gemini web ui, that I can export to google sheets.
```