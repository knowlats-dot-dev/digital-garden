---
title: "Course: Data Science Bootcamp #12 -Live 01 –Intro to Data Science"
updated: 2026-03-14T23:14:42+07:00
tags:
  - bootcamp
  - course
  - data-science
  - note
---
Part of [[course-data-science-bootcamp-12|Course: Data Science Bootcamp #12]]
# การเรียนรู้คลาสนี้

## Rule No.1

Skills in combination are more powerful than individual skills -- Pat Flynn - How to be better at (Almost) everything

ศัพท์เทคนิคคือ Skill Stacking
การเป็นเป็ด (Generalist) ที่ดีคือ การที่สามารถนำสกิลที่มีมา combine ด้วยกัน
ต่างจาก Specialist คือ Specialist เก่งแค่สกิลเดียวหรือไม่กี่สกิล แต่ Generalist เก่งหลายสกิล (ให้ดีคือเก่งกว่าค่าเฉลี่ย) โดยรวม Generalist ได้เปรียบมากกว่า โดยเฉพาะในโลกปัจจุบัน

ไม่จำเป็นต้องเก่งเท่า Specialist เน้นเก่งขึ้นเมื่อวานก็พอ

## Rule No.2
Never go beyond 80%

เรียนรู้จนถึงจุดที่เก่งพอเอาไปใช้ได้

จาก Law of Diminishing Return เมื่อใช้กับการเรียน แสดงให้เห็นว่า ยิ่งเราเก่งศาสตร์นั้นมาก เราจะเรียนได้น้อยลงเรื่อย ๆ
ถ้าถึง 80% เมื่อไหร่ ให้เริ่มเรียนสกิลใหม่ทันที
รู้ว่าถึงจุดนี้หรือยัง ได้จาก 

- สังเกตคนที่เก่งศาสตร์นั้น
- รู้สึกว่าเรียนหนึ่ง ชม . เริ่มเสียเวลา

บางทีแค่ 40% 50% ก็พอในบางศาสตร์
เราไม่จำเป็นต้องเก่งสุด ๆ ทุกอย่างเพราะบางอย่างที่เรียนแทบไม่ได้ใช้

## วิธีการเรียน

เราจะเรียนเป็น Sprint 
แบ่งเป็น 1  สัปดาห์ 

Planning - Refinement - Review
เรียนวันละ -  Can I meet the deadline - What have I done
30 นาที        on time                              good / bad? 

เทคนิคการเรียนรู้โดย Barbara Oakley
https://datarockie.com/blog/learning-how-to-learn-barbara-oakley/

# Intro to Data Science

Learn Data Science as **Skills**, not Position

 Data Science ช่วยเปลี่ยน
 
**Data -> Insight -> Decision**

"ทุกคนเกิดมาเพื่อเป็น Data Analyst"

เช่น ทนายต้องใช้ Data ประกอบการว่าความ

# Data Analyst vs. Data Scientist

อาจเป็นคนเดียวกันได้

แต่ในบริษัทใหญ่จะแบ่ง Scope งานให้ต่างกัน

- DA - วิเคราะห์ข้อมูลในอดีต และหาสาเหตุ
- DS - วิเคราะห์การแก้ปีญหา เช่น จะเพิ่มยอดขายยังไง

ใช้ Tool ต่างกัน
- DA - ใช้เครื่องมือเพื่อวิเคราะห์ข้อมูล  เช่น Spread Sheet, SQL, Dashboard, R, Business + Basic Analytics Concept
- DS - ใช้เครื่องมือสร้างโมเดลเพื่อจำแนกข้อมูลใช้แก้ปัญหา เช่น Python, Statistics, ML, Comunication + Project Management

แถม ๆ 

Data Engineer  - ไปทาง Software, Cloud, / Java Scala. DevOps, DataOps, CICD

แนะนำให้เรียนครอบคลุมทั้ง DA, DS โอกาสหางานจะง่ายขึ้น

ฝึกโดยใช้ตั้งแนวคิด 4M

1. Motivation - เราเรียนเพื่ออะไร  
2. Mindset - เชื่อว่าตัวเองจะทำแบบนั้นได้
3. Method - เราเรียนยังไง 
4. Momentum - ทำอย่างต่อเนื่อง
5. 
จาก Limitless - Jim Kwix

# Data Science Process

https://r4ds.hadley.nz/intro.html#fig-ds-diagram

## Case Study

(สรุปจาก AI บางส่วน)
### Target

บริษัท **Target Corporation** ต้องการเพิ่มยอดขายสินค้า สำรวจพบว่า ลูกค้าที่ตั้งครรภ์อยู่ ซื้อของใหม่ ๆ เยอะมาก ถือว่าเป็นลูกค้าที่มีมูลค่าสูง

บริษัททำ Model ที่สามารถทำนายได้ว่า ลูกค้าคนไหนกำลังตั้งครรภ์อยู่

ทำได้โดยการ เก็บข้อมูลว่าลูกค้าแต่ละคนซื้ออะไรบ้าง และตั้งครรภ์อยู่หรือไม่ (รู้จากการสมัครบริการบางอย่างที่เกี่ยวกับ Baby) จากการเก็บพบว่า ลูกค้าที่กำลังตั้งครรภ์มักจะเปลี่ยนไปซื้อสินค้าบางอย่าง เช่น

- unscented lotion    
- vitamin supplements
- cotton balls
- calcium / magnesium supplements
- large handbags

บริษัทจึงใช้ข้อมูลนี้ทำ Predictive model ส่งโปรโมชันสินค้าที่เกี่ยวกับทารกให้

เคสนี้สำคัญเพราะมันแสดงให้เห็นว่า

**Data สามารถทำนาย life events ของคนได้**

เช่น

- pregnancy
- moving house
- marriage

ก่อนที่คนรอบตัวจะรู้
### Tesco

Tesco ถือเป็นหนึ่งในบริษัทแรก ๆ ที่

 - ใช้ Big Data ใน retail
 - ใช้ **customer analytics**
 - ทำ **personalized marketing**

 ก่อนคำว่า Big Data จะดังเสียอีก
 
ประโยคที่ดังมากในวงการ Data Science มาจาก Tesco

 “Data is the new oil.”
 
 แนวคิดหลักของ case นี้คือ
 
 Data → Insight → Business Strategy
 
 Tesco ไม่ได้ใช้ data แค่ดูยอดขาย แต่ใช้เพื่อ
 
 - เข้าใจลูกค้า
 - ปรับกลยุทธ์
 - เปลี่ยนทั้งองค์กรให้ data-driven

**Lesson Learned**

ใช้แนวคิด Strategic Data Acquisition เริ่มจากทำความเข้าใจความต้องการของธุรกิจก่อน และคิดว่าจะใช้ข้อมูลยังไงเพื่อบรรลุเป้าหมายทางธุรกิจ

การทำ Data ต้องทำสองอย่าง

	Big data = what
	Small data = why

ขาดอย่างใดอย่างหนึ่ง การวิเคราะห์ก็ไม่ได้ใช้ประโยชน์

### Netflix

https://www.forbes.com/sites/ryanholiday/2012/04/16/what-the-failed-1m-netflix-prize-tells-us-about-business-advice

ปี 2006 Netflix จัดแข่งขัน Netflix Prize ให้ผู้เข้าร่วมสร้าง Model แนะนำหนังมที่แม่นยำที่สุด ถึงแม้จะได้ผู้ชนะ แต่สุดท้ายไม่ได้ใช้จริง เพราะ **Engineering Cost** สูงเกินไปทำให้ใช้ใน Production ลำบาก ความแม่นยำก็เพิ่มนิดเดียวไม่ค่อยคุ้มค่าเท่าไหร่

**Lesson Learned**

"โมเดลที่ดีที่สุดทางเทคนิคอาจไม่เหมาะกับระบบจริงเสมอไป"

แก้ปัญหาโดยใช้ Framework  [CRISP-DM](https://www.udacity.com/blog/2025/03/crisp-dm-explained-a-proven-data-mining-methodology.html)

1. เข้าใจธุรกิจ
2. เข้าใจ Data - วิ่งไปมากับขั้นตอน 1 เพื่อ Recheck ว่ามันตอบโจทย์และทำต่อได้จริง ๆ
3. เตรียม Data - คัดกรอง ทำความสะอาด Data เพื่อให้ได้ Data ที่เอาไปใช้ทำต่อได้จริง ๆ
4. Modeling -  วิเคราะห์ข้อมูลเพื่อทำ Insight กลับไปขั้นตอนที่ 3 ได้เมื่อ Model ที่ทำออกมาไม่ดี
5. วัดผล - วัดว่า Model ที่ทำออกมาตอบโจทย์ตามขั้นตอน 1 หรือไม่
6. Deploy

ขั้นตอน 1-3 ใช้เวลาไป 80%

เราควรเข้าใจเรื่องอื่น ๆ เช่น การตลาด, Business Model รูปแบบต่าง ๆ  เพื่อให้ทำงานง่ายขึ้น

### Cambridge Analytica

Cambridge Analytica เป็นตัวอย่างที่บอกว่า

**Data science = power**

เพราะมันสามารถ
- เข้าใจ psychology ของคน
- influence behavior
- เปลี่ยนผลการเลือกตั้ง
	

แต่ถ้าใช้ผิดทาง มันก็สามารถ
- ละเมิด privacy
- บิดเบือนข้อมูล
- manipulate สังคม

https://en.wikipedia.org/wiki/Project_Alamo

https://en.wikipedia.org/wiki/Customer_data_platform

https://en.wikipedia.org/wiki/The_Great_Hack (สารคดี)

### Moneyball

เรื่องเกิดกับทีมเบสบอล **Oakland Athletics** ในปี 2002  
นำโดยผู้จัดการทีม **Billy Beane**

ทีมนี้มีงบประมาณต่ำมากเมื่อเทียบกับทีมใหญ่ใน **Major League Baseball** แต่สุดท้ายกลับทำผลงานดีเกินคาดด้วยการใช้ **analytics**

ทีม Oakland A's มีข้อจำกัดสำคัญ

- งบประมาณนักกีฬา **ต่ำมาก**
- นักกีฬาดี ๆ ถูกทีมใหญ่ซื้อไปหมด
- วิธีเลือกผู้เล่นแบบเดิมใช้
    - intuition
    - scout experience
    - subjective judgement
        
ผลคือ

> ทีมเล็กแทบไม่มีทางชนะทีมรวย

ดังนั้นคำถามคือ

**จะสร้างทีมที่แข่งได้ โดยใช้งบต่ำได้อย่างไร**

จากการวิเคราะห์พบว่า ตลาดนักกีฬา **ประเมินค่าผิด**

ผู้เล่นบางประเภทถูกมองว่าไม่ดี เช่น

- แก่
- วิ่งช้า
- รูปร่างไม่ดี
- batting average ต่ำ

แต่ data พบว่า

> ผู้เล่นเหล่านี้มี OBP สูง

ซึ่งหมายถึง

**ช่วยทีมทำคะแนนได้**

ดังนั้น Oakland A's จึง

> ซื้อผู้เล่นที่ “ถูก undervalue”

ผลลัพธ์คือ ในปี 2002

ทีม Oakland A's

- ชนะ **20 เกมติด**
- เข้ารอบ playoff
- ใช้งบต่ำกว่าทีมใหญ่หลายเท่า

และก็เปลี่ยนทั้งวงการเบสบอลอีกด้วย ในปัจจุบันทุกทีม MLB ใช้ data analytics แล้ว

หนังที่แนะนำ
https://en.wikipedia.org/wiki/Moneyball_(film)

## Data Science Venn Diagram

https://drewconway.com/zia/2013/3/26/the-data-science-venn-diagram

![](/images/course-data-science-bootcamp-12-live-01-data-science-venn-diagram.png)

	ถ้าอยากจะเป็น Data Science ต้องไม่หยุดเรียนรู้

## บริษัทไม่ได้ต้องการ Data  เขาต้องการ Insight

![](/images/course-data-science-bootcamp-12-live-01-data-insight.png)
