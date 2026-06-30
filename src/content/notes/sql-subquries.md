---
title: Subquries in SQL
updated: 2026-04-17T19:27:08+07:00
tags:
  - sql
  - database
  - backend
---
Part of [[sql|SQL]]

**Subqueries** คือ Query ซ้อน Query

ใช้ทำอะไร?

> เอาผลลัพธ์จาก Query หนึ่งไปใช้เป็น Input ของอีก Query

**ตัวอย่าง**

> ใช้เป็นเงื่อนไข

```
SELECT name  
FROM users  
WHERE id IN (  
    SELECT user_id FROM orders  
);
```

```
SELECT name, salary  
FROM employees  
WHERE salary > (  
SELECT AVG(salary) FROM employees  
);
```

> ใช้เป็น derived table

```
SELECT *  
FROM (  
SELECT user_id, COUNT(*) AS total_orders  
FROM orders  
GROUP BY user_id  
) t  
WHERE t.total_orders > 5;
```

แทน Query ด้วยชื่อ และนำชื่อไปใช้เป็นเงื่อนไข
