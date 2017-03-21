API
[{ url:/category/list,GET
  describle: 获得商品分类，返回格式参考/product/category.json
}, {
   url:/product/{productId},GET
  describle: 或取商品详情，返回格式参考/product/productDetail.json
}, {
   url:/product/{category}/list?limit={limit}&offset={offset}&keyword={keyword}&orderField={orderField}&isAsc={isAsc}&labels={labels},GET
  describle: 获取商品列表，返回格式参考/product/product.json,只有limit和offset是必需的字段，完整url参考/product/12/list?limit=10&offset=1&labels=xianShiQiangGou,xinPinChangXian,reMaiTuiJian&orderField=price&isAsc=true,返回数据格式参考/product/product.json.标签labels以逗号分隔
}
 