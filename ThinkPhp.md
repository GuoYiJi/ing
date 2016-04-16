### D函数用法
>用于实例化自定义模型类

```php
D('User')   // 去实例化Model/UserModel.php里面的User类，假如User不存在的话，则自动实例化Model这个基类

D('User', 'service')    // 去实例化Service/UserService.php里面的User类，不存在的话同上
```