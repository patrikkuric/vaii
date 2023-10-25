export default function About() {
    return <>
        <div className="aboutMainSection">
            <h1 className="contactH1">Welcome to Quasar!</h1>
            <p></p>
            <section className="aboutSection">
                <h2 className="contactH2">Who We Are</h2>
                <p> &emsp;Welcome to Quasar, your premier destination for all things gaming! At Quasar, we are a passionate team of gamers who understand the thrill of the virtual realm. Born out of our love for gaming, we've curated an online space that caters to the diverse tastes and preferences of the gaming community. </p>
                <p> &emsp;Our team consists of gaming enthusiasts, tech experts, and customer-centric professionals who are dedicated to bringing you an unparalleled gaming experience. Whether you're a seasoned gamer or just starting your journey, Quasar is here to provide you with top-notch products and a community that shares your passion for the immersive world of gaming. </p>
            </section>

            <section>
                <h2 className="contactH2">What We Do:</h2>
                <ul>
                    <li><b>Extensive Game Collection:</b> Dive into a vast collection of the latest and greatest games across genres.</li>
                    <li><b>Cutting-Edge Gaming Gear:</b> Elevate your gaming experience with our handpicked selection of gaming peripherals, consoles, and accessories.</li>
                    <li><b>Exclusive Deals and Offers:</b> Enjoy exclusive deals and special offers on your favorite titles and gaming gear.</li>
                    <li><b>Customer Satisfaction:</b> Your satisfaction is our priority. Our customer support team is here to assist you, ensuring a seamless shopping experience from browsing to checkout.</li>
                </ul>
            </section>
        </div>

        <div>

            <section className="aboutContactSection">
                <h2>Contact Us</h2>
                <p>

                </p>
                <div className="contactInfo">
                    <i className="fa fa-envelope" aria-hidden="true" /><span> kuric20@stud.uniza.sk</span>
                    <p></p>
                    <i className="fa fa-phone" aria-hidden="true" /><span> +421 917 645 854</span>
                    <p></p>
                    <i className="fa fa-map-marker" aria-hidden="true" /><span> Rázusova 1731/1, 022 01 Čadca</span>
                </div>
            </section>
        </div>
    </>
}