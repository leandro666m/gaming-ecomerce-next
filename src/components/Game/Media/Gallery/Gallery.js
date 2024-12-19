import styles from './Gallery.module.scss';
import {Image} from "semantic-ui-react";
import {map} from "lodash";
import {ENV} from "@/utils";
import {FullModal} from "@/components/Shared";
import {useState} from "react";
import Slider from "react-slick";


export function Gallery(props) {

    const { screenshots } = props;
    const [show, setShow] = useState(false);

    const onOpenClose = () => setShow( (prevState)=> !prevState );

    const screenshotsClone = [...screenshots];
    const principalImage = screenshotsClone.shift();

    const settings = {
        dots: true,
        dotsClass: styles.dots,
        infinite: true,
        slidersToShow: 1,
        slidersToScroll: 1,
        arrows: false,
        customPaging: function (index) {
            return <Image src={ `${ENV.SERVER_HOST}${screenshots[index].attributes.url}` } />
        }
    }

    return (
        <>
            <div className={styles.gallery}>
                <div className={styles.principal}>
                    <Image src={ `${ENV.SERVER_HOST}${principalImage.attributes.url}` }  onClick={onOpenClose} />
                </div>

                <div className={styles.grid}>
                    { map(screenshotsClone, (screenshot, index) => (
                        <div key={index}>
                            <Image src={ `${ENV.SERVER_HOST}${screenshot.attributes.url}` } onClick={onOpenClose} />
                        </div>
                        ) )
                    }
                </div>
            </div>

            <FullModal show={show} onClose={ onOpenClose } >
                <div className={styles.carouselContainer}>
                    <Slider {...settings}>
                        {
                            map(screenshots, (screenshot)=>(
                                <div key={screenshot.id}>
                                    <Image src={ `${ENV.SERVER_HOST}${screenshot.attributes.url}` } />
                                </div>
                                )
                            )
                        }
                    </Slider>
                </div>

            </FullModal>
        </>
    );
}

