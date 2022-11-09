<template>
<div class="bg-light border-bottom">
      <div class="container">
        <nav class="navbar navbar-expand-lg bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">玩具工坊</a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <router-link to="/products" class="nav-link">產品列表</router-link>
                <router-link to="/faq" class="nav-link">常見問題</router-link>
              </div>
            <ul class="nav fs-5">
              <li class="nav-item"><router-link to="/favorite" class="nav-link"><i class="bi bi-suit-heart-fill"></i></router-link></li>
              <li class="nav-item"><router-link to="/cart" class="nav-link"><i class="bi bi-cart3"></i></router-link></li>
              <li class="nav-item"><router-link to="/login" class="nav-link"><i class="bi bi-person-circle"></i></router-link></li>
            </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
</template>
