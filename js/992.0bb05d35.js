"use strict";(self["webpackChunktoy_factory"]=self["webpackChunktoy_factory"]||[]).push([[992],{4226:function(t,i){i["Z"]={addToFavorite(t){const i=JSON.stringify(t);localStorage.setItem("favoriteList",i)},getFavorite(){return JSON.parse(localStorage.getItem("favoriteList"))}}},8426:function(t,i,e){e.r(i),e.d(i,{default:function(){return O}});e(7658);var s=e(3396),r=e(7139),a=e.p+"img/guandam.a0150a4c.jpg";const o={class:"container py-lg-5"},c={"aria-label":"breadcrumb"},l={class:"breadcrumb"},n={class:"breadcrumb-item"},d=(0,s._)("li",{class:"breadcrumb-item"},"我的最愛",-1),u=(0,s._)("h2",null,[(0,s._)("i",{class:"bi bi-suit-heart-fill fs-3 text-danger"}),(0,s.Uk)(" 我的最愛")],-1),p=(0,s._)("hr",null,null,-1),g={class:"row"},h={class:"col-lg-8"},f=(0,s._)("i",{class:"bi bi-suit-heart-fill text-danger",style:{"font-size":"150px"}},null,-1),m=(0,s._)("p",{class:"fs-2"},"來去把喜歡的玩具加入最愛吧~!",-1),v=["src","alt","onClick"],b={class:"h5 pt-ms-0 pt-3"},_={class:"d-flex flex-column"},y={key:0,class:"h5 mb-md-0"},k={key:1,class:"h6"},x={key:2,class:"h5 text-danger"},w={class:"d-flex"},C=["onClick"],$=(0,s._)("i",{class:"bi bi-cart-plus"},null,-1),L=[$],F=["onClick"],S=(0,s._)("i",{class:"bi bi-trash"},null,-1),D=[S],I=(0,s._)("div",{class:"col-md-4"},[(0,s._)("img",{src:a,alt:"我的最愛",class:"img-fluid d-none d-lg-block"})],-1);function P(t,i,e,a,$,S){const P=(0,s.up)("LoadingEl"),z=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(P,{active:$.isLoading},null,8,["active"]),(0,s._)("div",o,[(0,s._)("nav",c,[(0,s._)("ol",l,[(0,s._)("li",n,[(0,s.Wm)(z,{to:"/"},{default:(0,s.w5)((()=>[(0,s.Uk)("首頁")])),_:1})]),d])]),u,p,(0,s._)("div",g,[(0,s._)("div",h,[(0,s._)("div",{class:(0,r.C_)(["text-center pb-5",{"d-none":0!==$.favortieProducts.length}])},[f,m,(0,s._)("button",{type:"button",class:"btn btnStyle",onClick:i[0]||(i[0]=i=>t.$router.push("/products"))}," 選玩具 ")],2),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)($.favortieProducts,(i=>((0,s.wg)(),(0,s.iD)("div",{class:"border border-primary d-flex flex-column flex-md-row justify-content-around align-items-center p-3 mb-3 text-center",key:i.id},[(0,s._)("img",{src:i.imageUrl,class:"productImg img-fluid",alt:i.title,onClick:t=>S.getProduct(i.id),style:{cursor:"pointer"}},null,8,v),(0,s._)("p",b,(0,r.zw)(i.title),1),(0,s._)("div",_,[i.price===i.origin_price?((0,s.wg)(),(0,s.iD)("p",y,(0,r.zw)(t.$filters.currency(i.origin_price))+" 元 ",1)):(0,s.kq)("",!0),i.price!==i.origin_price?((0,s.wg)(),(0,s.iD)("del",k,"原價 "+(0,r.zw)(t.$filters.currency(i.origin_price))+" 元",1)):(0,s.kq)("",!0),i.price!==i.origin_price?((0,s.wg)(),(0,s.iD)("p",x," 特價 "+(0,r.zw)(t.$filters.currency(i.price))+" 元 ",1)):(0,s.kq)("",!0)]),(0,s._)("div",w,[(0,s._)("button",{type:"button",class:"btn btn-primary btnCircle mx-2 rounded-circle fs-4 text-white",onClick:t=>S.addCart(i,i.id)},L,8,C),(0,s._)("button",{type:"button",class:"btn btn-primary btnCircle mx-2 rounded-circle fs-4 text-white",onClick:t=>S.removeFavortie(i,i.id)},D,8,F)])])))),128))]),I])])],64)}var z=e(4226),q={data(){return{favortieProducts:[],favorite:z.Z.getFavorite()||[],isLoading:!1,status:{loadingItem:""}}},inject:["emitter"],methods:{getFavorite(){const t="https://vue3-course-api.hexschool.io/api/pengyu-api/products/all";this.isLoading=!0,this.$http.get(t).then((t=>{t.data.success&&(this.favortieProducts=t.data.products.filter((t=>this.favorite.includes(t.id)))),this.isLoading=!1}))},addCart(t,i){const e="https://vue3-course-api.hexschool.io/api/pengyu-api/cart";this.isLoading=!0,this.status.loadingItem=i;const s={product_id:i,qty:1};this.$http.post(e,{data:s}).then((e=>{this.status.loadingItem="",this.emitter.emit("update-cart",i),this.isLoading=!1,this.$httpMessageState(e,`將"${t.title}"加入購物車`)}))},getProduct(t){this.$router.push(`/products/${t}`)},removeFavortie(t,i){this.isLoading=!0,this.favorite.splice(this.favorite.indexOf(i),1),z.Z.addToFavorite(this.favorite),this.emitter.emit("update-favorite",this.favorite),this.$httpMessageState({data:{success:!0}},`將"${t.title}"移除我的最愛`),this.getFavorite()}},created(){this.getFavorite()}},Z=e(89);const j=(0,Z.Z)(q,[["render",P]]);var O=j}}]);
//# sourceMappingURL=992.0bb05d35.js.map