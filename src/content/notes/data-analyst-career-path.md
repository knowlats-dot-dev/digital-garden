---
title: Data Analyst Career Path
updated: 2025-10-12T22:17:40+07:00
tags:
---
สรุปจากบทความ https://datarockie.com/blog/data-analyst-complete-career-guide/ (ในคอร์สแนะนำให้อ่าน)

## Role

หน้าที่หลักของ Data Analyst (DA) คือ

**"วิเคราะห์และสรุปผลข้อมูลที่มีขนาดใหญ่อย่างแม่นยำและตอบโจทย์ธุรกิจ"**

1. Mining data for insights (Extracting and finding patterns in massive data sets)
2. Summarizing (Big) data
3. Communicating results

สิ่งที่ใช้
- ความรู้ Statistic พื้นฐาน (mean, median, mode, sd, count)
- ซอฟต์แวร์
	- Mining & Summarizing Tools
		- Spreadsheets (ex. Google Sheet, Microsoft Excel)
		- SQL
		- Some programming languages (ex. Python, R)
	- Visualization Tools
		- Power Bi
		- Looker Studio
		- Tableau

เรามักแบ่งการวิเคราะห์ข้อมูลออกเป็น 4 Phases ดังนี้

1. **Descriptive Analytics** (Finding "What happened?")
2. **Diagnostic Analytics** (Finding "Why did it happen?")
3. **Predictive Analytics** (Finding "What will happen?")
4. **Prescriptive Analytics** (Finding "How should we do?")

DA จะโฟกัส 2 ข้อแรกเยอะ เป็นการ Backward Looking ก่อนที่จะ Forward Looking ในข้อที่ 3, 4 ซึ่งหลาย ๆ บริษัทยกให้เป็นหน้าที่ของ Data Scientist (DS) แต่ DA ก็ควรจะเข้าใจทั้ง 4 Phase

> Data literacy !== Job Position
> Data literacy == Skills

(**Note**: Data literacy is the ability to read, understand, create, and communicate data as information -- [Data literacy - Wikipedia](https://en.wikipedia.org/wiki/Data_literacy))

## Responsibility

หลัก ๆ จะเป็นประมาณนี้

1. รับ Requirement จากฝ่าย Business
2. ดึงข้อมูลจาก Database
3. วิเคราะห์และสรุปข้อมูลด้วย Spreadsheets, R, Python
4. ทำ Summary Table และ Visualization
5. นำไปพูดคุยกับ Stakeholders ที่เกี่ยวข้องกับ Projects

DA จะทำหน้าที่หา Root clause ของปัญหาที่เกิดขึ้นใน Project เป็นหลัก (ตามที่บอกในข้อ 1, 2 ในหัวข้อที่แล้ว)  เพราะฉะนั้น**จะต้องมีทักษะในการตั้งคำถาม** สามารถอ่านหนังสือตามที่แนะนำใน [[recommend-books-for-data-science|Recommend Books]]

ยกตัวอย่างการตั้งคำถาม
บริษัท Startup จะมี business key metric เรียกว่า [AARRR Pirate Metric](https://www.productplan.com/glossary/aarrr-framework/) ที่ใช้วัดความเติบโตและความสำเร็จของ Product

**Acquisition (or awareness)** – ลูกค้าหา Product ของเราเจอได้อย่างไร?
**Activation –** ลูกค้าใช้ Product และ Take Action ต่าง ๆ ตามที่เราวางไว้หรือไม่?
**Retention –** ลูกค้าที่เข้าใช้ Product ของเราแล้วได้ใช้ต่อไปเรื่อย ๆ ไหม?
**Referral –** ลูกค้าชอบ Product พอจนมีการบอกต่อคนอื่นให้เข้ามาใช้งานเพิ่มหรือไม่?
**Revenue –** ลูกค้าเต็มใจที่จะจ่ายให้ Product ของเราไหม?

## Skills

### Core

1. ทำงานกับ Structured Data และ Semi-Structured Data (JSON, Mongo DB)

	- Spreadsheets
	- SQL & Basic Databases
	- Dashboard Tools
	- Statistics & Basic Probability
	- Basic Programming
	- Basic Data Engineering >> https://datarockie.com/blog/data-engineering-foundation/

2. ความรู้ด้านสถิติพื้นฐาน

	- Mean, Median, Mode, SD, Variance, IQR, Percentile, Quartile
	- Crosstabs
	- Normal Distribution
	- Confidence Interval
	- AB Testing (T-test, Anova)
	- Correlation & Regression ตัวพื้นฐานเช่น Linear และ Logistic Regression
	- Clustering เพื่อจับกลุ่มลูกค้าทำ Customer Segmentation
	- Basic Probability & Bayes Theorem

3. Programming >> R (Recommend, https://www.youtube.com/watch?v=-7YjJvPP13k), Python, SAS

### Add-on 

- Google Analytics & SEO
- Business & Marketing
- Storytelling
- Presentation Design
- User Experience & Research
- AI >> https://datarockie.com/blog/generative-ai-everyone/

เรียนรู้ในระดับพอใช้งานได้ (80% Rule) เด๊๋ยวค่อยไปเรียนเพิ่มจริงจังเมื่อจะใช้งานจริง ๆ