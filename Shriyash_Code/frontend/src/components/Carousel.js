import React, { Component } from 'react';



function Carousel() {



    return (
        <>
            <div class="carousel slide" data-bs-ride="carousel" id="carousel-1" style="height: 600px;">
                <div class="carousel-inner h-100">
                    <div class="carousel-item active h-100"><img class="w-100 d-block position-absolute h-100 fit-cover" src="https://source.unsplash.com/1600x600/?cab" alt="Slide Image" style={{ "z-index": "-1" }} />
                        <div class="container d-flex flex-column justify-content-center h-100">
                            <div class="row">
                                <div class="col-md-6 col-xl-4 offset-md-2">
                                    <div style={{ "max-width": "350px" }}>
                                        <h1 class="text-uppercase fw-bold">Biben dum<br />fringi dictum, augue purus</h1>
                                        <p class="my-3">Tincidunt laoreet leo, adipiscing taciti tempor. Primis senectus sapien, risus donec ad fusce augue interdum.</p><a class="btn btn-primary btn-lg me-2" role="button" href="#">Button</a><a class="btn btn-outline-primary btn-lg" role="button" href="#">Button</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item h-100"><img class="w-100 d-block position-absolute h-100 fit-cover" src="https://source.unsplash.com/1600x600/?luxury&amp;cab" alt="Slide Image" style={{ "z-index": "-1" }} />
                        <div class="container d-flex flex-column justify-content-center h-100">
                            <div class="row">
                                <div class="col-md-6 col-xl-4 offset-md-2">
                                    <div style={{ "max-width": "350px" }}>
                                        <h1 class="text-uppercase fw-bold">Biben dum<br />fringi dictum, augue purus</h1>
                                        <p class="my-3">Tincidunt laoreet leo, adipiscing taciti tempor. Primis senectus sapien, risus donec ad fusce augue interdum.</p><a class="btn btn-primary btn-lg me-2" role="button" href="#">Button</a><a class="btn btn-outline-primary btn-lg" role="button" href="#">Button</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item h-100"><img class="w-100 d-block position-absolute h-100 fit-cover" src="https://source.unsplash.com/1600x600/?taxi" alt="Slide Image" style={{ "z-index": "-1" }} />
                        <div class="container d-flex flex-column justify-content-center h-100">
                            <div class="row">
                                <div class="col-md-6 col-xl-4 offset-md-2">
                                    <div style={{ "max-width": "350px" }}>
                                        <h1 class="text-uppercase fw-bold">Biben dum<br />fringi dictum, augue purus</h1>
                                        <p class="my-3">Tincidunt laoreet leo, adipiscing taciti tempor. Primis senectus sapien, risus donec ad fusce augue interdum.</p><a class="btn btn-primary btn-lg me-2" role="button" href="#">Button</a><a class="btn btn-outline-primary btn-lg" role="button" href="#">Button</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div><a class="carousel-control-prev" href="#carousel-1" role="button" data-bs-slide="prev"><span class="carousel-control-prev-icon"></span><span class="visually-hidden">Previous</span></a><a class="carousel-control-next" href="#carousel-1" role="button" data-bs-slide="next"><span class="carousel-control-next-icon"></span><span class="visually-hidden">Next</span></a></div>
                <ol class="carousel-indicators">
                    <li data-bs-target="#carousel-1" data-bs-slide-to="0" class="active"></li>
                    <li data-bs-target="#carousel-1" data-bs-slide-to="1"></li>
                    <li data-bs-target="#carousel-1" data-bs-slide-to="2"></li>
                </ol>
            </div>




        </>
    );
}

export default Carousel;