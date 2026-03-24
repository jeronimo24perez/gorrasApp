import banner from "../../assets/banner.png"
const Banner = () => {
    return (

        <div className="p-3 w-100 mb-4 bg-body-tertiary rounded-3">
            <div className="w-100">

                <div className="row align-items-center">
                        <img
                            src={banner}
                            className="w-100 rounded shadow"
                            alt="Descripción del banner"
                        />
                </div>
            </div>
        </div>
    );
};

export default Banner;