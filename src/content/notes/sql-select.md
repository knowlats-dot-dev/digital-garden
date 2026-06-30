---
title: SELECT from SQL
updated: 2026-04-12T03:03:48+07:00
tags:
  - sql
  - database
  - backend
---
Part of [[sql|SQL]]

# SELECT

```
SELECT
	firstname,
	lastname,
	firstname || ' ' || lastname AS fullname
	LOWER(firstname) || '@company.com' AS email
FROM customers;
```

คำสั่ง SELECT เป็นคำสั่งที่ใช้บ่อยที่สุด โดยทั่วไปมันใช้ในการเรียกดูข้อมูล แต่ไม่ได้เรียกดูเฉย ๆ ได้อย่างเดียว มันทำได้หลายอย่างมาก

อย่างแรก มันสามารถต่อข้อมูลที่เป็น String และสามารถคำนวณสูตรคณิตเบื้องต้นได้ด้วย 

ตามตัวอย่างข้างบนเป็นการสร้างคอลัมน์ใหม่ (ที่ใช้แสดงข้อมูล) และต่อ string

ตัวอย่างข้างล่างเป็นการคำนวณจริง ๆ

```
SELECT
	name,
	milliseconds / 60000 AS minute,
	bytes / (1024*1024) AS mb
FROM track;
```

ผลลัพธ์จะได้จำนวนเต็ม ถ้าอยากได้จำนวนทศนิยม เติม .0 ที่ตัวเลขในสูตร ก็จะได้ แต่จะได้หลายตำแหน่ง

เราสามารถครอบด้วย ROUND

```
SELECT
	name,
	ROUND(milliseconds / 60000.0, 2) AS minute,
	ROUND(bytes / (1024*1024.0), 2) AS mb
FROM track;
```

เราสามารถ Filter ได้ด้วย WHERE

```
SELECT
	firstname,
	lastname
FROM customers
WHERE age >= 60;
```

ใช้ AND OR ได้

```
SELECT * FROM customers
WHERE age >= 60 AND (country = 'Bazill' OR country = 'Germany' OR country = 'Norway'); 

```

## CASE WHEN

แสดงข้อมูลตามเงื่อนไข เหมือนการทำ  `if-else` หรือ `switch`

```
SELECT 
	country,
	CASE 
		WHEN country IN ('Canada', 'USA') THEN 'America' 
		WHEN country IN ('Belgium', 'France', 'Italy') THEN 'Europe' 
		ELSE 'Other' 
	END AS region
FROM customers;
```

## DATE TIME

ดึง ปี เดือน วัน ใช้ STRFTIME() (มีใน SQLite เท่านั้น)

```
SELECT
	invoicedate,
	STRFTIME('%Y', invoicedate) AS year,
	STRFTIME('%m', invoicedate) AS month,
	STRFTIME('%d', invoicedate) AS day
FROM invoices;
```

## IN

แทนที่จะเขียน OR ต่อกัน เขียน IN สั้นกว่า

```
SELECT * FROM customers
WHERE country = 'Bazill' OR country = 'Germany' OR country = 'Norway';

เปลี่ยนเป็น

SELECT * from customers
WHERE country IN ('Bazill', 'Germany', 'Norway'); 
```

## BETWEEN ... AND ...

ถ้าต้องการข้อมูลเฉพาะช่วงๆ ใช้ Clause นี้ได้

```
SELECT * FROM customers
WHERE id BETWEEN 5 AND 10;
```

สามารถ Filter Date ได้ด้วย

```
SELECT * FROM customers
WHERE birthdate BETWEEN '1990-01-01 00:00:00' AND '2030-12-31 23:59:59';
```

## IS NULL

เอาเฉพาะที่มีค่าเป็น NULL

```
SELECT * FROM customers
WHERE birthdate IS NULL;
```

## LIKE

ใช้ทำ Pattern Matching

% แทนตัวอะไรก็ได้

```
SELECT firstname, lastname, email FROM customers
WHERE email LIKE '%@gmail.com';
```

ตามตัวอย่างข้างบนแปลว่า ให้ค้นหาตามคอลัมน์ email ที่มี Pattern "ตัวอะไรก็ได้" ตามด้วย "@gmail.com"

% สามารถใส่ตรงไหนก็ได้ ใส่ข้างหน้า ข้างหลัง หรือทั้งคู่ก็ได้

แต่ถ้าจะ Match ตัวอักษรตัวเดียว ต้องใช้ _ แทน

```
SELECT firstname, lastname, email FROM customers
WHERE firstname LIKE 'J_hn';
```

## COALESCE

ใช้สร้างคอลัมน์ที่แทนค่าที่เป็น NULL

คอลัมน์ไหนที่มีข้อมูลเป็น NULL เราแทนที่ด้วยข้อมูลใหม่ได้

```
SELECT
	company,
	COALESCE(company, 'End Customer') AS 'Company Clean' 
FROM customers;
```

ตามตัวอย่างหมายความว่าให้สร้าง Column ใหม่ชื่อ Company Clean โดยค่าจะเท่ากับ column "company" แต่ถ้าเป็น NULL ให้แทนด้วย "End Customer"

ใช้ Clean Data เหมาะมาก ๆ
## Aggregate Functions

คือฟังก์ชันสถิติเบื้องต้นใช้สรุปผลข้อมูล  

ฟังก์ชันที่เราจะใช้บ่อย ๆ มี 

- `COUNT`
- `AVG`
- `SUM`
- `MIN`
- `MAX`

การใช้ใน SQL จะใชัแบบนี้

```
SELECT COUNT(id) FROM customers;
```

ฟังก์ชันพวกนี้จะไม่สนใจค่า NULL ในคอลัมน์ที่ใช้ฟังก์ชัน

เราสามารถใช้กับ * ได้ด้วย เช่น `COUNT(*)` จะเป็นการนับจำนวนแถว

## COUNT Distinct

ใช้นับจำนวนข้อมูล โดยไม่นับค่าที่ซ้ำกัน

```
SELECT DISTINCT country FROM customers;
```

แบบนี้จะได้ข้อมูล Country ที่ไม่มีต่าซ้ำ

ถ้าต้องการนับจำนวน ให้ใช้ `COUNT` มาครอบ

```
SELECT COUNT(DISTINCT country) FROM customers;
```

## GROUP BY

ตัวนี้จะใช้คู่กับ Aggregate Functions  ใช้จัดกลุ่มค่าที่เหมือนกันแล้วตำนวณ

ตัวอย่าง ต้องการนับจำนวน customers ที่มาจากแต่ละประเทศ

```
SELECT country, COUNT(*) FROM customers GROUP BY country;
```

ตามตัวอย่าง จะได้ 2 คอลัมน์ คือ ชื่อประเทศ และจำนวน customers ตามประเทศ

## HAVING

ใช้เขียน condition คัดกรองข้อมูลหลัง GROUP BY  เขียน condition ได้เหมือน WHERE แต่สามารถใช้  Aggregate Functions ได้ (WHERE จะใช้ไม่ได้)

```
SELECT country, COUNT(*) FROM customers GROUP BY country HAVING COUNT(*) >= 100;
```

ตามตัวอย่างจะได้ country ที่มีจำนวน customer มากกว่า 100 คน

## ORDER BY

ใช้เรียงลำดับข้อมูลตามคอลัมน์

```
SELECT * FROM customers ORDER BY country DESC;
```

จากตัวอย่าง คือ เรียงลำดับตาม Country จาก Z ไป A

ถ้าอยากได้ A ไป Z ให้ใช้ `ASC`