# vue-el-shop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 1.托管到github
1. 在git上面创建一个代码仓库 create a new repository
2. 本地Git仓库和GitHub仓库之间的传输是通过SSH加密传输在用户主目录（C:\Users\Administrator）下，看看有没有.ssh文件，如果有，再看文件下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直接到下一步。如果没有，打开Git Bash，输入命令，创建SSH Key。
//110@126.com 是你自己注册GitHub的邮箱
```
ssh-keygen -t rsa -C "110@126.com" 
```
3. 接下来到GitHub上，打开“Account settings”–“SSH Keys”页面，然后点击“Add SSH Key”，填上Title（随意写），在Key文本框里粘贴 id_rsa.pub文件里的全部内容。
验证是否成功，在git bash里输入下面的命令
```
$ ssh -T git@github.com
```
4. 确认链接 
$ git config --global user.name  "name"//你的GitHub登陆名
$ git config --global user.email "123@126.com"//你的GitHub注册邮箱

---本地操作
5. 创建远程仓 
git remote add origin https://github.com/yangxionghua/vue-el-shop.git
6. 初始化本地
git init  
 $ git add .
$ git commit -m ‘first commit’ #-m 表示添加注释；‘first commit’为注释

7. 关联上传本地和远程 需要密码 
git push -u origin master

8. 创建分支开发
git checkout -b login

#### 常用命令
```
echo "# vue-el-shop" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/yangxionghua/vue-el-shop.git
git push -u origin main

    …or push an existing repository from the command line
git remote add origin https://github.com/yangxionghua/vue-el-shop.git
git branch -M main
git push -u origin main
```

