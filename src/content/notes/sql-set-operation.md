---
title: Set Operation in SQL
updated: 2026-04-17T17:52:52+07:00
tags:
  - sql
  - database
  - backend
---
Part of [[sql|SQL]]


ใน SQL มีคำสั่ง `INTERSECT`, `UNION`, `UNION ALL`, `EXCEPT` ใช้ JOIN ระหว่าง Query `SELECT`

ตัวอย่าง

```
SELECT * FROM a
UNION
SELECT * FROM b
```

แล้วมันได้ผลอย่างไร

- `INTERSECT` -- เราจะได้ข้อมูลจากทั้งสองตาราง โดยเอาเฉพาะค่าตรงกันในคอลัมน์ที่มีตำแหน่งตรงกัน มีข้อดีคือ **ลบค่า Duplicate ได้ด้วย** 
  ```
  SELECT name FROM Table_A  
  INTERSECT  
  SELECT name FROM Table_B;
  
   Table_A    Table_B  
	--------- ---------  
	Alice      Bob  
	Eve        Charlie  
	Bob        Eve
	
	Result:
	------
	name  
	------  
	Eve  
	Bob
  ```
- `UNION` -- เราจะได้ข้อมูลจากทั้งสองตาราง จะใช้ได้เฉพาะ Query ที่มีคอลัมน์ตรงกัน มันช่วยตัดค่าที่ Duplicate ให้ด้วย
  ```
	SELECT name FROM Table_A  
    UNION  
    SELECT name FROM Table_B;
    
    Table_A    Table_B  
	--------- ---------  
	Alice      Bob  
	Eve        Charlie  
	Bob        Eve
	
	Result:
	------
	name  
	------
	Alice  
	Eve  
	Bob
	Charlie
  ```
- `UNION ALL` -- ได้เหมือน `UNION` แต่ไม่ตัดค่าที่ Duplicate
- `EXCEPT` -- เราจะได้ค่าที่มาจากตารางแรกเท่านั้น ถ้ามีข้อมูลในตารางใน Query ที่ 2 ก็จะไม่เอาค่านั้นมาด้วย
  ```
  	SELECT name FROM Table_A  
    EXCEPT  
    SELECT name FROM Table_B;
    
     Table_A    Table_B  
	--------- ---------  
	Alice      Bob  
	Eve        Charlie  
	Bob        Eve
	
	Result:
	------
	name  
	------
	Alice
  ```