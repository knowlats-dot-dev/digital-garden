---
title: Data Transformation with R
updated: 2026-04-20T04:20:14+07:00
tags:
  - data-science
  - bootcamp
  - course
  - note
---
Part of [[data-science|Data Science]] and [[course-data-science-bootcamp-12|Course: Data Science Bootcamp #12]]
# What is Data Transformation

**Data Transformation** is the process of **converting data** from one format/structure -> another format/structure

เราจะใช้ [[r-programming|R programming]]

ในภาษา R เราจะใช้ Package `dplyr` ช่วย

```
install.packages("dplyr")
```

การใช้ library

```
library(dplyr)
```

ไฟล์ตัวอย่างที่จะลองทำในหัวข้อนี้

![](imdb.zip)

โหลด CSV กัน

```
imdb <- read.csv("imdb.csv", stringAsFactors= FALSE)
```

ใช้ `glimpse` ของ `dplyr` เพื่อ review ตาราง

```
glimpse(imdb)
```

ใช้ head, tail ดูข้อมูลช่วงต้น ช่วงท้าย

```
ช่วงต้น 10 แถวแรก
head(imdb, 10)
ช่วงท้าย 10 แถวท้าย
tail(imdb, 10)
```

# Pipe Operator

`dplyr` มาพร้อมกับ `%>%` เรียกว่า Pipe operator ใช้ต่อฟังก์ชันหลาย step

# Select Columns

```
# By Name
select(imdb, MOVIE_NAME, RATING)

# By No
select(imdb, 1, 5)

# Change column name
select(imdb, movie_name = MOVIE_NAME, released_year = YEAR)

# Use pipe operator
imdb %>% select(imdb, movie_name = MOVIE_NAME, released_year = YEAR) %>% head(10)
```

# Filter

```
filter(imdb, SCORE >= 9.0)
# Or
imdb %>% filter(SCORE >= 9.0)
```

แปลงหัวข้อเป็น lower case

```
names(imdb) <- tolower((names(imdb)))
```

ตัวอย่างการ filter

```
imdb %>% 
	select(movie_name, year, score) %>%
	filter(score >= 9.0 & year > 2000)
	
imdb %>% 
	select(movie_name, length, score) %>%
	filter(score == 8.8 | score == 8.3 | score == 9.0)
	

imdb %>% 
	select(movie_name, length, score) %>%
	filter(score %in% c(8.3, 8.8, 9.0))
	
imdb %>% 
	select(movie_name, genre, rating) %>%
	filter(genre == "Drama")
```

ใช้ `grepl()` หา Pattern ใช้ใน filter ได้

```
imdb %>% 
	select(movie_name, genre, rating) %>%
	filter(grepl("Drama", imdb$genre))
```

ผลลัพธ์ที่ได้จะ filter  เอาชื่อหนังที่มี Genre มี `Drama` เป็นส่วนประกอบ (เหมือน `LIKE` ใน `SQL`)

**ระวัง** `grepl()` Case-sensitive

# Create New Columns

```
imdb %>%
	select(movie_name, score, length) %>%
	mutate(
		score_group = if_else(score >= 9, "High Rating", "Low Rating"),
		length_group = ifelse(length >= 120, "Long Film", "Short Film")) %>%
	head(10)
	
```

ผลลัพธ์ที่ได้ จะได้ column ใหม่ 2 คอลัมน์ คือ `score_group`, `length_group`

# Arrange Data (Sort)

```
imdb %>%
	arrange(length) %>%
	head(10)
```

ผลลัพธ์ที่ได้คือ length จะเรียงจากน้อยไปมาก

ถ้าจะเรียงจากมากไปน้อย คือ `desc()` ครอบคอลัมน์

```
imdb %>%
	arrange(desc(length)) %>%
	head(10)
```

เรียงหลายคอลัมน์ได้ด้วย

```
imdb %>%
	arrange(rating, desc(length)) %>%
	head(10)
```

# Summary Statistic

```
imdb %>%
	summarise(mean_length = mean(length),
			sum_length = sum(length)
			 sd_length = sd(length),
			 min_length = min(length),
			 max_length = max(length),
			 n = n() # นับจำนวนแถว
	)
```

เราสามารถ groupBy ก่อนได้

```
imdb %>%
	group_by(rating) %>%
	summarise(mean_length = mean(length),
			sum_length = sum(length)
			 sd_length = sd(length),
			 min_length = min(length),
			 max_length = max(length),
			 n = n() # นับจำนวนแถว
	)
```

Rating มีค่าว่าง เราต้องตัดออก

```
imdb %>%
	filter(rating != "") %>%
	group_by(rating) %>%
	summarise(mean_length = mean(length),
			sum_length = sum(length)
			 sd_length = sd(length),
			 min_length = min(length),
			 max_length = max(length),
			 n = n() # นับจำนวนแถว
	)
```

# Join Data

```
favorite_flim <- data.frame(id = c(5, 10, 25, 30, 98))

favorite_film %>%
	inner_join(imdb, by = c("id", "no"))
```

# Export CSV File

บันทึกผลลัพธ์ของการทำทั้งหมด เราสามารถเก็บลงไปในไฟล์ CSV

CSV มันทำงานต่อได้ในโปรแกรมหลากหลาย เช่น Excel, Google sheet

มี 2 ฟังก์ชันที่ใช้ได้

`write.csv()` เป็น R built-in function  ไม่ต้องโหลด library เพิ่ม

```
# Result result data frame to file "imdb_result.csv"
write.csv(imdb, "imdb_result.csv", row.names=FALSE) # ไม่เอาตัวนำหน้า row
```

`write_csv()` เป็น function ที่อยู่ใน library `readr` มีความต่างในเรื่องของ Performance,ไม่มีการเขียนตัวนำหน้า Row, และเขียนเป็น UTF-8 ตลอด

# แนะนำ Library ใหม่ชื่อ `tidyverse`

Library นี้เป็นตัวรวม library ที่ใช้บ่อย ๆ รวมถึง `dplyr` และ `readr` ด้วย

```
## หลังจาก install.packages("tidyverse")
...
Installing package into ‘C:/Users/.../AppData/Local/R/win-library/4.5’ (as ‘lib’ is unspecified) also installing the dependencies ‘ps’, ‘sass’, ‘digest’, ‘farver’, ‘labeling’, ‘RColorBrewer’, ‘viridisLite’, ‘base64enc’, ‘processx’, ‘evaluate’, ‘highr’, ‘xfun’, ‘yaml’, ‘bslib’, ‘fontawesome’, ‘htmltools’, ‘jquerylib’, ‘tinytex’, ‘backports’, ‘data.table’, ‘gtable’, ‘isoband’, ‘S7’, ‘scales’, ‘timechange’, ‘systemfonts’, ‘textshaping’, ‘callr’, ‘knitr’, ‘rmarkdown’, ‘selectr’, ‘stringi’, ‘broom’, ‘conflicted’, ‘dbplyr’, ‘dtplyr’, ‘forcats’, ‘ggplot2’, ‘haven’, ‘lubridate’, ‘modelr’, ‘ragg’, ‘reprex’, ‘rstudioapi’, ‘rvest’, ‘stringr’, ‘tidyr’, ‘xml2’
...
```

การโหลด Library

```
> library(tidyverse)
── Attaching core tidyverse packages ────────────── tidyverse 2.0.0 ──
✔ dplyr    1.2.1     ✔ readr    2.2.0
✔ forcats  1.0.1     ✔ stringr  1.6.0
✔ ggplot2  4.0.2     ✔ tibble   3.3.1
✔ lubridate 1.9.5     ✔ tidyr    1.3.2
✔ purrr    1.2.2
```
## ความต่างระหว่าง Tibble vs Data Frame

`tidyverse` จะใช้ Tibble มากกว่า

Tibble คือ Structed Data Structure ที่มักปรากฎในลักษณะที่เป็นแบบนี้


![](images/data-transformation-tibble-vs-data-frame.png)

ข้อแตกต่างของ Tibble กับ Data Frame

- การสร้าง
	- Tibble สร้างโดย `tibble()`
	- Data Frame สร้างโดย `data.frame()`
-  Tibble แสดงตาราง 10 แถวเท่านั้น ในขณะที่ Data Frame แสดงทั้งหมด
	- ในส่วนของ Tibble ถ้าต้องการให้แสดงมากกว่านั้น จะต้องใช้คำสั่ง  `print(tibble, n=20)` โดยที่ n คือจำนวนแถวที่ต้องการ
	- Data Frame จะใช้ head ควบคุมการแสดงผล `head(df, 20)`
- Class ต่างกัน
	- Data Frame คือ `"data.frame"`
	- Tibble คือ `"tbl_df"     "tbl"        "data.frame"`
- Tibble มีการแสดงผลที่ดีกว่า Data Frame คือ
	- มีบอกขนาดตาราง
	- มีบอก type ของแต่ละคอลัมน์
	- ตารางแสดงผลตามขนาดของ console

การเปลี่ยน Data Frame เป็น Tibble

```
df_tibble <- tibble(df)
```

# Random Sample Data

ใช้ `sample_n()` ในการสุ่มตัวอย่าง Data

```
sample_n(tibble, size=5)
```

 จากคำสั่งข้างบนจะสุ่มข้อมูลทั้งหมด 5 แถว ไม่ซ้ำกันแต่ละครั้ง
ถ้าต้องการให้คงที่เสมอ ให้เพิ่มคำสั่ง `set.seed()` ก่อน sample

```
set.seed(25)
sample_n(tibble, size=5)
```

ฟังก์ชันสุ่มอีกหนึ่งตัว คือ `sample_frac()` สุ่มเป็น % 

```
sample_frac(tibble, size=0.2)
sample_frac(tibble, size=0.2, replace=T) # Result  มีโอกาสได้แถวที่ซ้ำกัน
```

**Note:** Frac ย่อมาจาก Fraction

# Slice

ใช้ดึงแถวที่ต้องการ

```
slice(tibble, 1:6)
# หรือ
tibble %>%
	slice(1:6) 
```

```
tibble %>%
	slice(c(1, 3, 6))
	
# เทียบเท่ากับ sample_n() สุ่ม size=10
tibble %>%
	slice(sample(nrow(tibble), 10))
```