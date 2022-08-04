https://linyencheng.github.io/2020/03/22/tool-npm/


安裝ang:cli(-g:全域環境)，安裝後會放到node_modules資料夾內
```properties
npm install -g @angular/cli
```

根據package.json安裝套件
```properties
npm install
```

更新可更新的 node_modules (從package.json & package-lock.json引用)
```properties
npm update
```

自動修復 (執行npm update後可能會提示使用)
```properties
npm audit fix --force
```

查看已安裝的包
```properties
npm list --depth=0
```