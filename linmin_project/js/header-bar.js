let nav = document.getElementById('header-bar')
nav.innerHTML = `
<header class="container-fluid">
            <nav class="navbar navbar-expand-lg navbar-light" >
                <div class="container-fluid">
                    <a class="navbar-brand" href="index.html" style=" font-size: 2rem;"><img src="images/logo.svg" width="30%" style="margin-right: 10px;" alt="LinMin設計" />LinMin設計</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="index.html">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="https://simplemin125.wixsite.com/minlin125/about-4" target="_blank">關於我</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> 平面設計 </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="https://simplemin125.wixsite.com/minlin125/projects-2" target="_blank">LOGO設計</a></li>
                                    <li><a class="dropdown-item" href="https://simplemin125.wixsite.com/minlin125/projects-2" target="_blank">名片設計</a></li>
                                    <li><a class="dropdown-item" href="https://simplemin125.wixsite.com/minlin125/projects-2" target="_blank">DM設計</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="https://instagram.com/wowminwowho?igshid=OGQ5ZDc2ODk2ZA==" target="_blank">攝影</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="https://instagram.com/skyskyq55?igshid=OGQ5ZDc2ODk2ZA==" target="_blank">繪畫</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> 網頁設計 </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="https://super-m-777.1shop.tw" target="_blank">一頁式網頁設計練習</a></li>
                                    <li><a class="dropdown-item" href="https://cyvtc.com.tw/t0001/08-2" target="_blank">wordpress網頁課程練習</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" target="_blank">生活小賣場</a>
                            </li>
                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
`
