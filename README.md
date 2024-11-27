Designed Role-Based Access Control (RBAC) UI

Tech stack used - Yarn, Vite, React, Redux, Redux-Toolkit, ANTD UI, Firebase

Features-

1. Multiple user roles, and permissons, each role having different permission.

2. Handled Duplicate User Registration

3. Seamless Login/Sign Up Flow

There are three roles

Owner - Only one can't be  Created, Edited or  Deleted but can be viewed by any user.
        Login Creds - {"email":"taklikaramanshu@gmail.com", "password":"Owner@1234"}

Admin - Can be Created, Edited and Deleted by Owner, Can be viewed by any user.

View  - Can be created, Edited, and Deleted by Admin, Owner, Can be viewed by any user.