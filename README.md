# Todo List 애플리케이션 - 백엔드

Node.js + Express + MongoDB로 개발된 투두 애플리케이션의 백엔드 API 서버입니다.

## 🚀 라이브 데모

**프론트엔드 애플리케이션:** [https://todo-list-fe-neon.vercel.app/](https://todo-list-fe-neon.vercel.app/)

## 📋 주요 기능

- **사용자 인증 시스템**

  - 회원가입 및 로그인 API
  - JWT 토큰 기반 인증
  - 비밀번호 암호화 (bcryptjs)

- **할 일 관리 API**
  - 할 일 항목 생성, 조회, 수정, 삭제 (CRUD)
  - 할 일 완료/미완료 상태 변경
  - 카테고리별 할 일 분류

## 🛠️ 사용 기술

- **Node.js** - 서버 런타임 환경
- **Express.js** - 웹 애플리케이션 프레임워크
- **MongoDB** - NoSQL 데이터베이스
- **Mongoose** - MongoDB ODM (Object Document Mapper)
- **JWT (jsonwebtoken)** - 인증 토큰 관리
- **bcryptjs** - 비밀번호 암호화
- **validator** - 데이터 검증
