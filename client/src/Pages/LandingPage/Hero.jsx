import Navbar from '../../Layout/Navbar';

const Hero = () => {
    return (
        <>
            <div className="hero_area">
                {/* <!-- slider section --> */}
                <section className="slider_section">
                    <div
                        id="customCarousel1"
                        className="carousel slide"
                        data-ride="carousel"
                    >
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="detail-box">
                                                <h5>Bostorek Bookstore</h5>
                                                <h1>
                                                    For All Your <br />
                                                    Reading Needs
                                                </h1>
                                                <p>
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipisicing
                                                    elit. Iste quam velit saepe
                                                    dolorem deserunt quo quidem
                                                    ad optio.
                                                </p>
                                                <a href=""> Read More </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="img-box">
                                                <img
                                                    src="images/slider-img.png"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- end slider section --> */}
            </div>
        </>
    );
};

export default Hero;
