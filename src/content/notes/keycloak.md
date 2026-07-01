---
title: Keycloak
updated: 2026-07-01T03:43:55+07:00
tags:
  - tools
---
*Latest Noted 25 May 2021*

# Keycloak คืออะไร?

คือระบบ **Identity and Access Management** ที่ถูกพัฒนาโดย **Redhat Software** เน้นจัดการ User Account, Role, และการ Authentication ต่าง ๆ ซึ่ง Keycloak จะรองรับการ Authentication ผ่าน **OpenID,** **SAML** รวมถึง **OAuth2** ผ่าน Provider ต่าง ๆ เช่น **Google, Facebook, Twitter** เป็นต้น

# โครงสร้างของ Keycloak

![](/images/keycloak-realm-architecture.png)

**Keycloak จะทำงานเป็น Server ตัวหนึ่ง**ที่มีการทำงานอย่างเป็นระบบ โดยจะเก็บข้อมูล และส่วนประกอบต่าง ๆ ไว้ใน Namespace ที่เรียกว่า **Realm** ทันทีที่เริ่มการทำงานครั้งแรก Keycloak จะสร้าง **Master Realm** ให้ ถึงตรงนี้เราสามารถใช้งานและเปลี่ยนแปลงข้อมูลต่าง ๆ ได้ในทันที รวมถึงเพิ่ม Realm แบ่งขอบเขตข้อมูลตามที่ต้องการ อย่างไรก็ตาม มีข้อแนะนำว่า ให้หลีกเลี่ยงการใช้ Master Realm ในการทำระบบ Authentication เชื่อมไปยังแอปพลิเคชันต่าง ๆ  สงวนไว้สำหรับการทำ Administration ใน Keycloak เท่านั้น เพื่อป้องกันความเสียหายที่เกิดขึ้นในระบบ

Realm ประกอบด้วยส่วนประกอบต่าง ๆ ดังนี้

- **Clients** - เป็นส่วนที่ทำหน้าที่จัดการและเก็บข้อมูลของแอปพลิเคชันต่าง ๆ รวมถึง Login System
- **Configuration management** - เป็นส่วนที่ให้เราปรับแต่งระบบ Login System และการสมัครสมาชิกได้
- **User management (users, roles and groups)** - เป็นส่วนที่จัดการและเก็บข้อมูลของ User, Role, และ Group
- **Custom themes (UI)** - เป็นส่วนที่เก็บ Design System สำหรับปรับแต่งหน้าตาของ Login System, Administration, User Management, รวมถึง Email ที่ใช้สำหรับ Verify Email, และเปลี่ยนรหัสผ่าน
- **Events**
- **Federation**
- **LDAP or Active Directory integration**

# การติดตั้ง

เราสามารถติดตั้งและใช้งาน Keycloak ได้ทั้งใน Mode **Standalone** และ **Clustered**

- **Standalone Mode** - ให้ Keycloak ทำงานและจัดการข้อมูลหลาย ๆ ส่วนภายใน Server เดียว มีข้อดีคือ ติดตั้งและปรับแต่งได้ในเวลาไม่นาน แต่มีข้อเสียคือ มันเป็น Single point ถ้าระบบเกิดความเสียหาย ก็จะเข้าใช้งานไม่ได้เลย
- **Clustered หรือ Domain Mode** - แบ่งการทำงานของ Keycloak ให้ไปอยู่หลายที่ ไม่ใช่ที่ Server ใด Server หนึ่ง

ในที่นี้จะบอกวิธีการติดตั้งใน Standalone Mode

## ติดตั้งในเครื่องเอง

เราสามารถดาวน์โหลด Keycloak ได้ที่

[Downloads](https://www.keycloak.org/downloads.html)

เมื่อดาวน์โหลดเป็น **Standalone server distribution** เราจะได้ไฟล์รูปแบบ ZIP

เมื่อคลาย ZIP นั้นออกมาจะมีไฟล์โปรแกรมและ Script ต่าง ๆ ให้เราใช้มากมาย

![](/images/keycloak-standalone-distribution-structure.png)

- ***bin/ —*** ส่วนนี้จะเก็บ Script ที่เปิดใช้งานและจัดการกับ Server
- ***domain/ —*** ส่วนนี้จะเก็บ Configuration และการทำงานเมื่อรัน Server ใน [domain mode](https://www.keycloak.org/docs/latest/server_installation/index.html#_domain-mode).
- ***modules/ —*** ส่วนนี้จะเก็บ Java Liberies ทั้งหมดที่ใช้ในการทำงานของ Server
- ***standalone/ —*** ส่วนนี้จะเก็บ Configuration และการทำงานเมื่อรัน Server ใน [standalone mode](https://www.keycloak.org/docs/latest/server_installation/index.html#_standalone-mode).
- ***standalone/deployments/ —*** ส่วนนี้จะทำให้เราสามารถเขียน Extension ให้กับ Keycloak ได้ ดูเพิ่มเติมได้ที่ [Server Developer Guide](https://www.keycloak.org/docs/latest/server_development/)
- ***themes/ —*** ส่วนนี้จะเก็บไฟล์ HTML, Style sheet, JavaScript และรูปภาพที่ใช้ปรับแต่ง UI ของระบบใน Server เราสามารถปรับแต่งหรือสร้างเป็นของตัวเองได้ ดูเพิ่มเติมที่ [Server Developer Guide](https://www.keycloak.org/docs/latest/server_development/)

เมื่อเราปรับแต่งเสร็จแล้ว ให้รันคำสั่งนี้เพื่อเปิดใช้งาน Keycloak

Linux/Unix

`$ <keycloak-dir>/bin/standalone.sh`

Windows

`> <keycloak-dir>\bin\standalone.bat`

## ติดตั้งผ่าน Docker

### อย่างรวดเร็ว

```bash
docker run -p 8080:8080 jboss/keycloak
```

เมื่อเสร็จแล้ว ก็เข้าใช้งานที่ [http://localhost:8080](http://localhost:8080) ได้ทันที

แต่เราจะทำอะไรไม่ได้เลย เนื่องจาก เรายังไม่มี Admin User ให้ Login เข้าไปใช้งาน เราสามารถเพิ่ม Admin User ได้โดยใช้คำสั่งนี้

```bash
docker exec <CONTAINER> /opt/jboss/keycloak/bin/add-user-keycloak.sh -u <USERNAME> -p <PASSWORD>
```

ถ้าไม่ต้องการเสียเวลาเรียก Script สร้าง Admin User เราต้องกำหนด User และ Password ตอนสร้าง Container ดังนี้

```bash
docker run -p 8080:8080 -d -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin jboss/keycloak
```

### เปลี่ยนการเก็บข้อมูลของ Keycloak

ปกติแล้ว Keycloak จะเก็บข้อมูลต่าง ๆ ทั้งหมดในฐานข้อมูล H2 ซึ่งเป็นฐานข้อมูลที่ทำงานอยู่ภายในหน่วยความจำและไฟล์ แต่เราสามารถเปลี่ยนได้ ใน Docker Image จะมี Environment variable ให้เรากำหนดข้อมูลของฐานข้อมูลที่จะใช้งานด้วย
**ตัวอย่าง:** การเชื่อมกับ Database อื่นที่ไม่ใช่ H2 (ในที่นี้ใช้ Postgres)

1. สร้าง Network เพื่อให้ Container ที่เป็น Keycloak Server และ Database เชื่อมต่อกัน

```bash
docker network create keycloak-network
```

2. สร้าง DB Container 

```bash
docker run -d \
					 -p 5433:5432 \
					--net keycloak-network \
					-e POSTGRES_DB=keycloak \ 
					-e POSTGRES_USER=keycloak \
				  -e POSTGRES_PASSWORD=keycloak \
				  -v /opt/docker/data/postgres/keycloak-research-server:/var/lib/postgresql/data \ 
					--name keycloak-db-server  \
					postgres
```

3. สร้าง Keycloak Container

```bash
docker run -d \ 
						-p 8180:8080 \ 
						--name keycloak-server \
					  --net keycloak-network \ 
						-e DB_VENDOR=postgres \
						-e DB_ADDR=keycloak-db-server \ 
						-e DB_USER=keycloak
						-e DB_PASSWORD=keycloak \
						 jboss/keycloak
```

### การปรับแต่งอื่น ๆ

ดูข้อมูลที่นี่ [https://hub.docker.com/r/jboss/keycloak](https://hub.docker.com/r/jboss/keycloak)

ถ้าเราต้องการปรับแต่งจนถึงไฟล์ภายใน เช่น เพิ่ม Theme เราต้องสร้างไฟล์จากภายนอก Container และสร้าง Dockerfile เพื่อเพิ่มคำสั่ง Copy ไฟล์ใน Container จากนั้นก็ Build Image และสร้าง Container ต่อไป ซึ่งที่อยู่ของไฟล์ Server ภายใน Container จะอยู่ที่ `/opt/jboss/keycloak` และมีโครงสร้างเหมือน **Standalone server distribution**

```docker
FROM jboss/keycloak:11.0.3

COPY ./themes /opt/jboss/keycloak/themes/

# Copy customized config files ...
```

ตัวอย่างธีม: [https://github.com/Robinyo/serendipity-keycloak-theme](https://github.com/Robinyo/serendipity-keycloak-theme)

## ติดตั้งผ่าน Kubernetes

เนื่องจาก Keycloak มีเป็น Docker Container ดังนั้นเราสามารถใช้ Kubernetes เพื่อ Deploy Keycloak ได้ โดยเขียน Script ไม่กี่ไฟล์ และปรับแต่งได้เหมือนการรันผ่าน Docker

```yaml
apiVersion: v1
kind: Service
metadata:
  name: keycloak
  namespace: keycloak-developments
  labels:
    app: keycloak
spec:
  ports:
  - name: http
    port: 8080
    targetPort: 8080
  selector:
    app: keycloak
  type: LoadBalancer
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: keycloak
  namespace: keycloak-developments
spec:
  replicas: 1
  selector:
    matchLabels:
      app: keycloak
  template:
    metadata:
      labels:
        app: keycloak
    spec:
      containers:
      - name: keycloak
        image: jboss/keycloak # หรือ Docker Image ที่เราปรับแต่งเพิ่มเติมนอกจากค่าดั้งเคิมใน Keycloak
        env:
        # Admin user
        - name: KEYCLOAK_USER
          value: "admin"
        - name: KEYCLOAK_PASSWORD
          value: "admin"
        # Database
        - name: DB_VENDOR
          value: "postgres"
        - name: DB_ADDR
          value: "192.168.49.1"
        - name: DB_PORT
          value: "5432"
        - name: DB_DATABASE
          value: "keycloak"
        - name: DB_USER
          value: "user"
        - name: DB_PASSWORD
          value: "1234"
        # Other
        - name: PROXY_ADDRESS_FORWARDING
          value: "true"
        # Read more at https://hub.docker.com/r/jboss/keycloak
        ports:
        - name: http
          containerPort: 8080
        - name: https
          containerPort: 8443
        volumeMounts:
          # ข้อมูล Server จะอยู่ที่ /opt/jboss/keycloak ใน Container
          - mountPath: /opt/jboss/keycloak/themes
            name: keycloak-themes
      volumes:
        - name: keycloak-themes
          hostPath:
            path: ./themes
```

## ติดตั้งผ่าน Kubernetes Operator

เราสามารถใช้ Kubernetes Operator ในการติดตั้ง Keycloak และจัดการกับข้อมูลที่เกี่ยวกับ Administration อัตโนมัติ ข้อดีของการติดตั้งโดยใช้ Operator คือ สามารถติดตั้งได้โดยทำผ่านไฟล์ YAML ได้ ไม่ต้องเขียน Script เอง และสามารถกำหนด Resource ที่จะใช้กับ Keycloak ได้โดยไม่ต้องเสียเวลาเขียนไฟล์เพิ่มเติมมากมาย

[Keycloak Operator on Kubernetes](https://www.keycloak.org/getting-started/getting-started-operator-kubernetes)

[Server Installation and Configuration Guide](https://www.keycloak.org/docs/latest/server_installation/index.html#_operator)

## การติดตั้งแบบ Clustered (Kubernetes)

[How to Run Keycloak in HA on Kubernetes](https://blog.sighup.io/keycloak-ha-on-kubernetes/)

# Keycloak Settings

หลังจากติดตั้งเสร็จแล้ว เราจะต้องเข้าเว็บไซต์เพื่อปรับแต่งให้พร้อมทำงานก่อน ซึ่งมีขั้นตอนคร่าว ๆ ดังนี้

1. Login เข้าไปโดยใช้ Admin User ที่เราสร้างขึ้นมา
2. สร้าง Realm ใหม่ หรือ Import Realm ที่เก็บไว้ และปรับแต่ง Login System ตามต้องการ
3. สร้าง Client เชื่อมต่อกับ Application ที่ต้องการ และปรับแต่งการ Authentication
4. สร้าง Group, Role และ Scope ที่จะใช้ใน Client
5. **(Optional)** สร้าง User และ Assign Role ให้เรียบร้อย
6. **(Optional)** Export Realm เพื่อเก็บค่า Settings ต่าง ๆ ของ Relm รวมทั้ง Role, Group, Clients เป็นไฟล์ JSON สำหรับใช้ประกอบในการสร้าง Server ตัวใหม่ (สำหรับ Development หรือเพื่อ Backup เก็บไว้)

## การสร้าง Realm ใหม่

ใน Keycloak นั้น Realm ก็คือ ตัวจัดการข้อมูลเกี่ยวกับผู้ใช้ รหัส กลุ่ม และบทบาทต่าง ๆ รวมไปถึง Flow การยืนยันตัวตนและการสมัครสมาชิก เมื่อได้เริ่มใช้งาน Keycloak ครั้งแรกแล้ว เราควรจะสร้าง Realm ก่อนที่จะจัดการกับข้อมูลต่าง ๆ ดังกล่าว ซึ่งเราสามารถสร้าง Realm ได้มากเท่าที่ต้องการ แต่ละ Realm จะมีการทำงานที่แยกออกจากกัน การสร้าง Realm ในแต่ละครั้งนั้น เราสามารถทำได้ตามขั้นตอนดังนี้

1. เข้า Admin Console วางเมาส์ที่ชื่อ Realm ปัจจุบันที่แถบซ้ายมือ (ในที่นี้คือ Master) จะมีปุ่ม **"Add realm"** ปรากฎขึ้น ให้คลิกปุ่มนั้น

![](/images/keycloak-add-realm-button.png)

2. พิมพ์ชื่อ Realm ที่ต้องการ ชื่อนี้จะถือว่าเป็น ID ประจำตัวและจะเป็นส่วนหนึ่งของ URL ที่เชื่อมมายัง Realm นี้ แนะนำให้ตั้งชื่อติดกัน สามารถใช้เครื่องหมายขีดบน (-) และขีดล่าง (_) ได้

3. คลิกให้ Enabled เป็น ON เพื่อให้ Realm ทำงานได้

4. คลิกปุ่ม Create

![](/images/keycloak-create-realm-form.png)

รออีกสักครู่ Realm ก็จะถูกสร้างขึ้น

![](/images/keycloak-new-realm-created.png)

## การปรับแต่งระบบสมาชิกผ่าน Realm

Realm เป็นที่ตั้งของระบบสมาชิกหรือ Login System หนึ่งระบบ การปรับแต่งต่าง ๆ ใน Realm จึงเกี่ยวข้องกับระบบสมาชิกนั้น แล้วระบบสมาชิกมีหน้าตาเป็นอย่างไร? เราสามารถดูได้ในส่วนของ Client และคลิกลิงก์ ฺBase URL ของ Client ชื่อว่า **"account"**

![](/images/keycloak-account-client-base-url.png)

![](/images/keycloak-account-ui-overview.png)

![](/images/keycloak-account-ui-settings.png)

![](/images/keycloak-realm-settings-overview.png)

จากรูป จะเห็นว่า Keycloak สร้างระบบสมาชิกให้แต่ละ Realm เช่นนี้ เราสามารถปรับแต่งได้ผ่าน Admin Console เริ่มจากที่ **Realm Settings**

**Realm Settings** เป็นส่วนที่ใช้ปรับแต่งระบบในเบื้องต้น เราสามารถเปลี่ยนกลไกการยืนยันตัวตน (Authentication) การสร้าง Token ที่ใช้ยืนยันตัวตนและดึงข้อมูล พวก UI ต่าง ๆ รวมถึงภาษาที่ใช้ให้เป็นไปตามที่ต้องการ ซึ่งส่วนนี้จะแบ่งเป็นส่วนย่อยอีกหลายส่วน แต่ละส่วนจะมีรายละเอียดดังนี้

- **General**
    
    ส่วนที่จัดการชื่อ การแสดงชื่อ และ URL ของ Realm
    
    ![](/images/keycloak-realm-general-settings.png)
    
    - **Name** — ชื่อที่ใช้เป็น ID ของ Realm
    - **Display Name** — ชื่อของ Realm ที่จะแสดงในหน้าจอของระบบสมาชิก
    - **HTML Display Name** — Display Name ในรูปแบบ HTML เราสามารถใส่หัวข้อพร้อม Tag HTML ที่ต้องการเพื่อตกแต่งให้สวยงาม หากเราใช้ช่องนี้แล้ว Keycloak จะแสดงเป็นหัวข้อแทนที่ข้อความที่อยู่ในช่อง **Display Name** ไปโดยอัตโนมัติ ดังรูป (1)
    - **Frontend URL —** Base URL ของ Server ที่จะแทนที่ Base URL ที่เกิดขึ้นมาตอนสร้าง Server (`http://localhost:8080/auth`) จะมีประโยชน์มากในกรณีที่ต้องเข้าถึง Keycloak ผ่าน Load Balancer หรือ Reverse Proxy
    - **Enabled —** ให้ผู้ใช้สามารถใช้ระบบสมาชิกได้หรือไม่? ถ้าช่องนี้เป็น OFF แล้วเข้าหน้าจอระบบสมาชิกจะเป็นดังรูป (2)
    - **User-Managed Access —** อนุญาตให้ผู้ใช้สามารถจัดการ Resource และ Application ได้ในระบบสมาชิกหรือไม่? (เทียบกับระบบอื่น ๆ เช่น Google, Facebook ส่วนที่จัดการ Resource และ Application ที่ว่าก็คือ ส่วนที่เราดูได้ว่า เราเชื่อม Account กับแอปพลิเคชันอะไรไว้บ้างนั่นเอง)
    - **Endpoints —** ส่วนที่แสดงรายการ Endpoint ที่ใช้ใน Protocol OpenID และ SAML จะเป็นประโยชน์เมื่อเราใช้ Keycloak สร้างระบบ Authentication เพิ่มความปลอดภัยให้กับแอปพลิเคชันภายนอก
    
    ![รูป (1) เมื่อใช้ HTML Display Name จะมีผลทำให้หัวข้อที่แสดงในหน้าจอของระบบสมาชิกจากเดิมใช้ Realm Name กลายเป็นชื่อที่มีการตกแต่งด้วย HTML Tag](/images/keycloak-html-display-name-example.png)
    
    รูป (1) เมื่อใช้ HTML Display Name จะมีผลทำให้หัวข้อที่แสดงในหน้าจอของระบบสมาชิกจากเดิมใช้ Realm Name กลายเป็นชื่อที่มีการตกแต่งด้วย HTML Tag
    
    ![รูป (2) เมื่อเราให้ Enabled เป็น "OFF" เราและผู้ใช้จะไม่สามารถใช้ระบบสมาชิกได้เลย](/images/keycloak-realm-disabled-screen.png)
    
    รูป (2) เมื่อเราให้ Enabled เป็น "OFF" เราและผู้ใช้จะไม่สามารถใช้ระบบสมาชิกได้เลย
    
- **Login**
    
    คือ ส่วนที่จัดการ Feature และส่วนประกอบต่าง ๆ ที่อยู่ในระบบสมาชิก
    
    ![](/images/keycloak-login-settings.png)
    
    - **User Registration** — เปิด/ปิดฟังก์ชันสมัครสมาชิก
    - **Email as username** — เปิด/ปิดการให้ Username เป็น Email แทนชื่อที่เป็นข้อความ String ธรรมดา
    - **Edit username** — เปิด/ปิดอนุญาตให้สามารถแก้ไข Username ได้
    - **Forgot password** — เปิด/ปิดฟังก์ชันเปลี่ยนรหัสผ่านกรณีลืมรหัสผ่าน
    - **Remember Me** — เปิด/ปิดระบบจำ Session ของผู้ใช้ หากส่วนนี้เป็น ON เมื่อบราวเซอร์ของผู้ใช้ปิดการทำงาน และเปิดทำงานใหม่ จะยังสามารถเข้าใช้ระบบได้อยู่จนกว่า Session จะหมดอายุ
    - **Verify email** — เปิด/ปิดฟังก์ชันยืนยันอีเมลหลังการสมัครสมาชิก
    - **Login with email** — เปิด/ปิดอนุญาตให้สามารถเข้าสู่ระบบด้วย Email ได้ หากเราปรับให้ Email as username เป็น OFF และส่วนนี้เป็น ON จะทำให้ผู้ให้สามารถเลือกได้ว่าจะเข้าสู่ระบบด้วย Username ที่เป็นข้อความ String ธรรมดาหรือ Email ได้
    - **Duplicate emails** — อันนี้จะปรากฎเมื่อเราให้ Email as username และ Login with email เป็น OFF ทั้งคู่ หากปรับเป็น ON ระบบจะอนุญาตให้สามารถใช้อีเมลซ้ำกันได้หลาย Account
    - **Require SSL** — ให้เชื่อมต่อด้วย Protocol SSL หรือเปล่า? มี 3 ตัวเลือกให้เลือก คือ
        - **none** — ปิดไม่ให้เชื่อมต่อด้วย SSL หมายความว่า ผู้ใช้ไม่จำเป็นต้องเข้าใช้งานระบบผ่าน HTTPS ก็ได้ (ไม่ควรทำใน production!)
        - external requests — เปิดให้เชื่อมต่อด้วย SSL เฉพาะเมื่อมีการเข้าถึงระบบด้วย External IP Address ที่ไม่ใช่ localhost, 127.0.0.1, 192.168.x.x, 172.16.x.x
        - **all requests** — เปิดให้เชื่อมต่อด้วย SSL ทุก IP Address เลย
- **Keys**
    
    เป็นส่วนที่จัดการ Key และ Certificate ที่ใช้เข้ารหัสและสร้าง Token ต่าง ๆ
    
    ![](/images/keycloak-keys-settings.png)
    
    ![](/images/keycloak-certificates-settings.png)
    
- Email
    
    เป็นส่วนที่จัดการข้อมูลเกี่ยวกับ Mail Server ซึ่งจะใช้ส่งอีเมลในฟังก์ชัน Verify Email และ Forget Password
    
- Themes
- Localizations
- Cache
- Tokens
- Client Registration
- Security Defenses

## การสร้าง Client

## การสร้าง Group, Role และ Scope

## การจัดสรร Role และ Scope ให้ Client

## การสร้าง User

## การ Export Realm

[Securing Spring Boot REST APIs with Keycloak](https://medium.com/devops-dudes/securing-spring-boot-rest-apis-with-keycloak-1d760b2004e)

[Keycloak: Core concepts of open source identity and access management - Red Hat Developer](https://developers.redhat.com/blog/2019/12/11/keycloak-core-concepts-of-open-source-identity-and-access-management/)

# การเชื่อมต่อ Keycloak กับ Application
