---
title: SQL JOIN
updated: 2026-04-15T18:05:45+07:00
tags:
  - sql
  - database
  - backend
---
Part of [[sql|SQL]]

# Join

การ Join คือการเชื่อมข้อมูลระหว่างตารางหลักและตารางอื่นที่มีช้อมูลเกี่ยวข้องกันผ่าน  Primary Key (คีย์หลัก) และ Foreign Key (คีย์ที่เชื่อมข้อมูลจากตารางหลัก)

```
+-------------------+          +----------------------+
|     Customers     |          |        Orders        |
+-------------------+          +----------------------+
| PK customer_id    |<---------| FK customer_id       |
| name              |          | PK order_id          |
| email             |          | order_date           |
+-------------------+          +----------------------+
```
## Join using WHERE 

จากตัวอย่าง สามารถ JOIN แบบนี้

```
SELECT
	C.customer_id,
	C.name CustomerName,
	C.email CustomerEmail,
	O.order_id OrderId,
	O.otder_date OrderDate
FROM Customers C, Orders O
WHERE C.customer_id = O.order_id
```

## Inner Join

ตือ Join เอาข้อมูลเฉพาะที่มีข้อมูลทั้งสองตาราง

เปลี่ยนคำสั่ง WHERE เป็น JOIN ไปนิดเดียวได้แบบนี้

```
SELECT
	C.customer_id,
	C.name CustomerName,
	C.email CustomerEmail,
	O.order_id OrderId,
	O.otder_date OrderDate
FROM customers C
INNER JOIN orders O ON C.customer_id = O.order_id
```

เพิ่ม  WHERE  ได้หลัง Join

```
SELECT
	C.customer_id,
	C.name CustomerName,
	C.email CustomerEmail,
	O.order_id OrderId,
	O.otder_date OrderDate
FROM customers C
INNER JOIN orders O ON C.customer_id = O.order_id
WHERE C.name LIKE 'A%'
```

อยาก Join หลายตาราง สามารถต่อกันแบบนี้

```
SELECT
	C.customer_id,
	C.name CustomerName,
	C.email CustomerEmail,
	O.order_id OrderId,
	O.order_date OrderDate,
	P.product_name ProductName
FROM customers C
INNER JOIN orders O ON C.customer_id = O.order_id
INNER JOIN product P ON O.product_id = P.id
```

## Left Join

คือ Join โดยเอาตารางหลักเป็นตัวตั้ง และเชื่อมกับตารางเกี่ยวข้อง โดยที่ตารางที่เชื่อมจะมีข้อมูลหรือไม่ก็ได้

```
SELECT
	C.customer_id,
	C.name CustomerName,
	C.email CustomerEmail,
	O.order_id OrderId,
	O.otder_date OrderDate
FROM customers C
LEFT JOIN orders O ON C.customer_id = O.order_id
```

## Right Join

ใน SQL ไม่มี Clause Supported Right Join โดยตรงแต่สามารถทำ right join ก็คือวางตารางที่ต้องการเชื่อมอยู่ทางซ้าย แลพตารางหลักอยู่ทางขวานั่นเอง

## Full Join

คือ  Join โดยที่ยอมให้ทั้งสองตารางไม่มีข้อมูลก็ได้ (* SQL Not Supported)

## Cross Join

คือ การจับคู่ค่าทุกค่าของทั้งสองตาราง แล้วจะได้ตารางใหม่ที่มีจำนวนแถวเท่ากับผลคูณของแถวสองตาราง

```
SELECT * from a, b
```

หรือ

```
SELECT * from a CROSS JOIN b
```

## Self Join

ใช้เชื่อมข้อมูลของตัวเอง แสดงถึงความสัมพันธ์กันเอง เช่น Employee กับ Manager

ทำได้ด้วย การใช้ WHERE

```
SELECT
	e1.name staff,
	e1.level staff_level,
	e2.name  manager,
	e2.level manager_level,
FROM Employee e1, Employee e2
WHERE e1.manager_id = e2.id
```