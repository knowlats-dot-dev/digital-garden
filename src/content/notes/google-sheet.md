---
title: Google Sheet
updated: 2026-03-31T04:44:49+07:00
tags:
  - tools
  - data-science
  - bootcamp
  - note
---
This is a [[tools|Tools]] use to manage the structure data (Table)

Content below is part of [[course-data-science-bootcamp-12|Course: Data Science Bootcamp #12]]

# 101
## Why Google Sheet?

- **Store** Structured Data
- **Analyze** Data
- Chart & **Present** Data

## Manually Input

- พิมพ์ข้อมูลบน Cell โดยตรง
- เพิ่มข้อมูลแบบ Array 
	- ใส่ ={data1, data2, data3} ใน Cell แรก มันจะกระจายข้อมูลไปยัง Cell ข้าง ๆ ต่อกัน 
	- พิมพ์ ; แทน , มันจะกระจายในแนวตั้ง
	- สามารถใส่เป็น Matrix แค่ใส่ , และ ; 
		- มีข้อจำกัดคือ ต้องใส่ให้ทุกแถว และทุกคอลัมน์มีจำนวนเท่ากันหมด เช่น ใส่ 3 แถว แถวละ 2 ตัวเท่ากัน ไม่งั้นจะขึ้น `#VALUE!`

## Cell Reference
| การพิมพ์ในช่อง formula | ความหมาย                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| A1                     | ไม่มีการล็อก Cell - เวลากดเลื่อน Cell เพื่อก้อปสูตร มันจะปรับตามตำแหน่งที่อยู่เลย                                              |
| $A$1                   | Absolutely reference - ไม่ว่าจะกดเลื่อนออกที่ไหน มันจะคงตำแหน่งนี้เสมอ กด `F4` เพื่อ Lock Cell แบบนี้                          |
| A$1                    | กดเลื่อนด้านข้าง (Column) มันจะเปลี่ยนตำแหน่งตัวซ้าย แต่ถ้ากดเลื่อนขึ้นลง มันจะได้ค่าเดิมเพราะมีการล็อกตำแหน่งแถว (Row) เอาไว้ |
| $A1                    | กดเลื่อนลง (Row) จะเปลี่ยนตำแหน่งตัวขวา แต่ถ้ากดเลื่อนไปทางขวาซ้าย จะได้ค่าเดิมเพราะมีการล็อกตำแหน่งคอลัมน์ (Column) เอาไว้    |
## Keyboard Shortcut

https://support.google.com/docs/answer/181110
## What is function 

หน้าที่ของ Function คือ เปลี่ยนจาก Input -> Output

ลักษณะการพิมพ์คือ = functionName(value, reference, ...)

ตัวอย่าง Analysis Function

- =COUNTA( employee ) 
- =MIN( salary )
- =MAX( salary )
- =AVERAGE( salary ) 
- =SUM( salary )

### Array Formula

เราสามารถพิมพ์ Formula ได้โดยไม่ต้องก้อปโดยพิมพ์กำหนด Range (`cellRefStart:cellRefEnd`) ในสูตร แล้วกด

- Windows : `CTRL+SHIFT+ENTER`
- Mac: `CMD+SHIFT+ENTER` (command)

มันจะมี `=ArrayFormula()` ครอบสูตรของเรา จากนั้นกด Enter มันจะคำนวณผลตามสูตรและใส่ Cell ตามแนว Range ที่กำหนด

### IF

`=IF(condition, value_if_true, value_else)`

condition ex.

- `=value`
- `>value`
- `<value`

Nested If (Old,Not recommended)

`=IF(condition, value_if_true, IF(condition2, value_if_true, ...))`

IFS

`=IFS(condition, value_if_true, condition2, value_if_true, ...)`

`AND()`, `OR()`, `NOT()` ใช้ใน IF ได้ แต่ใช้ร่วมกับ ArrayFormula ไม่ได้

### Switch

`=SWITCH(range, value1, result1, value2, result2, ...)`

### Median

หาค่ากลางใน range

Step

1. Sort ด้วย `=SORT(range)`
2. `=MEDIAN(range)`

###  AVERAGEIF and SUMIF

- AVERAGEIF ใช้หาค่าเฉลี่ยเมื่อ `range` มี condition ตามเกณฑ์ `=AVERAGEIF(range_if, condition, range_to_cal)`
- SUMIF ใช้หาผลรวมเมื่อ `range` มี condition ตามเกณฑ์ `=SUMIF(range_if, condition, range_to_cal)`

# 102
## Import Data

- `=IMORTDATA(URL)` -- Import data from CSV file 
- `IMPORTHTML(URL, query, index)` -- Import data from "list" / "table"(query) at index (start at 1) on the website as a follow URL

These access data from external URL - Need to be allow access before proceed. The imported data are not editable.

![](/images/google-sheet-import-data.png)

Try edit = insert new data to that cell then the import data are invalid.(Maybe `#REF!` meaning if can not import data because there is a cell that is not empty)

![](/images/google-sheet-import-data-2.png)

Example Resources (For Experiment)
- [https://people.sc.fsu.edu/~jburkardt/data/csv/csv.html](https://people.sc.fsu.edu/~jburkardt/data/csv/csv.html)
- [https://www.w3schools.com/html/html_tables.asp](https://www.w3schools.com/html/html_tables.asp)

## COUNTIFS

ใช้นับจำนวนของข้อมูลที่ตรงกับเงื่อนไข (หลายเงื่อนไข)

  `=COUNTIFS(range_to_check, condition, range_to_check2, condition2, ...)`
  
![](/images/google-sheet-countifs.png)

As the example, the result is 5.

## SUMIFS

เหมือน SUMIF แต่รองรับหลาย condition

  `=SUMIFS(range_to_check, condition, range_to_check2, condition2, ...)`

## FILTER

ในการทำงาน Data Analysis เรามีการใช้ filter เพื่อกรองหรือดึงเฉพาะข้อมูลที่เราต้องการมาทำงาน 

เราสามารถกด filter ผ่านทาง UI ได้ โดยการเลือกคอลัทน์ที่ต้องการและกด ![](/images/google-sheet-filter-2.png) มันก็จะขึ้นแบบนี้ เราสามารถกดเพิ่มได้ว่าจะกรองข้อมูลไหน

![](/images/google-sheet-filter-3.png)

ถ้าเราต้องการ filter ข้อมูลเอามาแสดงแยกจากตารางเดิม หรือใช้เงื่อนไขที่ซับซ้อน เราต้องใช้สูตร

`=FILTER(range, condition, condition2, ...)`

range สามารถตั้งชื่อแบบนี้ได้ด้วย ด้วยการลากตลุมตาราง แล้วพิมพ์แทนที่ range ที่มุมซ้ายนั้น

![](/images/google-sheet-filter-4.png)

![](/images/google-sheet-filter-5.png)

![](/images/google-sheet-filter-6.png)

ตัวอย่างจากพี่ทอย

![](/images/google-sheet-filter.png)

## SORT

เราสามาถกด  ![](/images/google-sheet-filter-2.png) เหมือนกับ Filter เพื่อเรียงข้อมูลตามคอลัมน์ได้เลย แตุ่ถ้าาจะใช้สูตรก็มีเหมือนกัน

`=SORT(range_table, range_column_to_sort, TRUE if want ASC, range_column2_to_sort, TRUE if want ASC)`

## DATE

รูปแบบวันที่ที่ Sheet ใช้คำนวณจะมีรูปแบบ `YYYY-MM-DD`

เราเปลี่ยนการแสดงผลได้ ด้วยการคลิกที่ จะมีหน้าต่างให้เลือกรูปแบบที่ต้องการ

Formula ที่ใช้ทำงานกับวันที่ก็มี

- `=YEAR(date)`
- `=MONTH(date)` จะได้ตัวเลขเดือนออกมา
- `=DAY(date)`
- `=DATE(year,month,day)`
- `=TODAY()`
- `=DATEDIFF(date1, date2, u)` Date difference หาว่าจาก `date1` ไป `date2` ห่างกันเท่าไหร่ตาม `u`
	- D = จำนวนวัน เทียบเท่า `date2-date1`
	- M = จำนวนเดือน
	- Y = จำนวนปี
	- YM = จำนวนเดือนเมื่อหักจำนวนปีแล้ว
	- YD = จำนวนวันเมื่อหักจำนวนปีแล้ว

## VLOOKUP

ถ้าเรามีตารางสองตารางขึ้นไป แต่ละตารางก็มีข้อมูลเชื่อมกัน เราใช้ VLOOKUP ในการดูข้อมูลข้ามตารางได้

# 103

## Query

`=QUERY(data, query)`

data = ตาราง ชีท
query = SQL-like statement e.g. `select A,B,C`

ในส่วนของ Data Set เราสามารถ Control เลื่อนดูข้อมูลได้ โดยกดปุ่ม Ctrl + ลูกศรขึ้นลงซ้ายขวา

กด Ctrl + A เพื่อเลือกข้อมูลทั้งหมดได้

ในการ Query เราต้องเลือกก้อนข้อมูลที่เราจะใช้ ตั้งชื่อเก็บไว้ Menu: Data > Named ranges ตั้งชื่อและกด Done

ในส่วน Query จะมีการเขียนตามนี้ สามารถดูเต็ม ๆ ได้ที่ https://developers.google.com/chart/interactive/docs/querylanguage
### select

`=QUERY(range, "select A, B, C")

A, B, C คือชื่อคอลัมน์ ต้องเป็นตัวพิมพ์ใหญ่เท่านั้น

ไม่ต้องมี FROM clause (เพราะอ้า่งชื่อตารางมาแล้ว)

### where

ใช้สำหรับ filter ข้อมูลต่าง ๆ ตัวอย่าง `=QUERY(IMDB, "SELECT * WHERE D = 'R' ")`

เราสามารถใช้ LIKE operation ใน where ได้

`=QUERY(customers, "SELECT * WHERE E LIKE '%@gmail.com' ")`

ค้นหาข้อมูลลูกค้าที่มีอีเมล (คอลัมน์ E) gmail.com

`=QUERY(customers, "SELECT * WHERE N LIKE '%n%' ")`

ค้นหาข้อมูลลูกค้าที่มีตัวอักษร n ในคอลัมน์ N (สมมติว่าเป็นคอลัมน์ชื่อ)

`=QUERY(customers, "SELECT * WHERE N LIKE 'J_hn' ")`

ค้นหาข้อมูลลูกต้าที่มีชื่อขึ้นต้นด้วย J ลงท้ายด้วย hn _ แทนตัวอักษรอะไรก็ได้หนึ่งตัว

	% ใช้ match any character
	_ ใช้ match single character

สามารถใช้ or, and เครื่องหมายต่าง ๆ เช่น >, >=, <. <= ได้หมดเลย

### Filter NULL

ใน Google Sheet NULL คือช่องว่างใน Cell

- `WHERE D is null` คือ เอาเฉพาะค่า NULL
- `WHRE D is not null` คือ ไม่เอาค่า NULL

### Filter Date

เราสามารถเลือกข้อมูลภายในช่วงเวลาแบบนี้

`=QUERY(employee, "SELECT * WHERE D < date '2022-08-08' ")`

มี date ข้างหน้าตามด้วย 'ปี-เดือน-วัน'

### aggregate functions: avg sum min max count

`=QUERY(data, "SELECT AVG(E), SUM(E), MIN(E)")`

จากตัวอย่าง หาค่าเฉลี่ย ผลรวม และค่าน้อยที่สุดในคอลัมน์ E

### group by

จัดกลุ่มข้อมูล เหมาะใช้คู่กับ Agg Function

`=QUERY(IMDB, "SELECT D,AVG(D) GROUP BY D")`

ถ้าอยากใช้ WHERE ด้วยต้องเขียน WHERE ก่อน GROUP BY

`=QUERY(IMDB, "SELECT D, AVG(E) WHERE D = 'R' GROUP BY D")`

### order by

เรียงลำดับข้อมูล

`=QUERY(IMDB, "SELECT B, D, E, G ORDER By D, E DESC")`

`DESC` เรียงจากมากไปน้อย

### limit

จำกัดข้อมูลที่จะออกมา

`=QUERY(IMDB, "SELECT A, B, C limit 5")`

จะได้ข้อมูล 5 แถว

### label

เราสามารถเปลี่ยนชื่อคอลัมน์ที่ Query สร้างข้อมูลมาได้

`=QUERY(IMDB, "SELECT A, B, C limit 5 label A 'MOVIE_ID', B 'MOVIE_NAME', C 'YEAR_RELEASED'")`

ตารางที่ออกมาจะมี 3 คอลัมน์ ชื่อจามที่เรากำหนด label

เราสามารถตั้งชื่อคอลัมน์ที่เกิดจาก Agg function ได้ด้วย

`=QUERY(IMDB, "SELECT D, AVG(G) WHERE D is not null GROUP BY D label AVG(G) 'Average Score'")`
``

### Pivot

คือ Agg function + Group by

จากเดิม

`=QUERY(IMDB, "SELECT D, AVG(G) WHERE D is not null GROUP BY D")`

เป็น

`=QUERY(IMDB, "SELECT AVG(G) PIVOT D")`

Result จะเป็นตารางเรียงข้อมูลในแนวยาว

ถ้าจะใส่ WHERE เขียนด้านหน้า Pivot

`=QUERY(IMDB, "SELECT AVG(G) WHERE D is not null PIVOT D")`

ถ้าเราอยากได้ข้อมูลแนวตั้ง ครอบ Query function ด้วย `TRANSPOSE()`

`=TRANSPOSE(QUERY(IMDB, "SELECT AVG(G) WHERE D is not null PIVOT D"))`

### Dynamic Query

ให้ Query เปลี่ยนไปตามข้อมูลที่มาจาก Cell อื่น 

# 104

จะเป็นเรื่อง Pivot Table สร้างตารางเพื่อใช้สรุปเป็นรายงาน

[[pivot-table|Pivot Table (Not Finished)]]