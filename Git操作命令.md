#### 添加文件到暂存区
```
git add file		// 单个

git add   			// 当前目录下所有改动过的文件
```
2016-3-1
#### 忽略文件
```
1、
git update-index --assume-unchanged file_name_path
// 忽略已经给git管理过的文件，在有改动时不会被跟踪到

git update-index --no-assume-unchanged file_name_path
// 继续跟踪

2、
通过.gitignore文件来管理，在项目根目录下新建该文件，在把需要忽略的文件写进去

`.gitignore`
// 忽略的文件路径
index.html
view/index.html
view/*.html
```

---
2016-3-25
### 删除缓存文件及文件夹
```
git rm -r --cached path 		// 删除缓存文件夹
git rm --cached file_name_path  // 删除缓存文件
```