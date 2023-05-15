import Modal from "../components/Modal";
import Button from "../components/Button";
import { useState } from "react";

function ModalPage(){
    const[showModal, setShowModal] = useState(false)

    const handleClick = () => {
        setShowModal(true);
    };
    const hanldeClose = () => {
        setShowModal(false);
    };

    const actionBar = <div>
        <Button onClick={hanldeClose} primary>I Accept</Button>
    </div>
    const modal = <Modal onClose={hanldeClose} actionBar={actionBar}>
        <p>
            Here is an imoprtant agreement for you to accept
        </p>
    </Modal>
    return(
    <div>
        <Button primary onClick={handleClick}>Show Modal</Button>
        {showModal && modal}
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id molestie metus, et tincidunt leo. Fusce odio purus, tincidunt sit amet semper a, facilisis et magna. Ut vitae tristique urna, nec maximus quam. Mauris vel orci libero. Phasellus eu aliquam nisi, a dignissim felis. Nulla placerat vestibulum pulvinar. Nulla facilisi. Donec ante dolor, vulputate in ullamcorper congue, auctor sed purus. Nullam convallis eros et arcu posuere blandit. 
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id molestie metus, et tincidunt leo. Fusce odio purus, tincidunt sit amet semper a, facilisis et magna. Ut vitae tristique urna, nec maximus quam. Mauris vel orci libero. Phasellus eu aliquam nisi, a dignissim felis. Nulla placerat vestibulum pulvinar. Nulla facilisi. Donec ante dolor, vulputate in ullamcorper congue, auctor sed purus. Nullam convallis eros et arcu posuere blandit. 
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id molestie metus, et tincidunt leo. Fusce odio purus, tincidunt sit amet semper a, facilisis et magna. Ut vitae tristique urna, nec maximus quam. Mauris vel orci libero. Phasellus eu aliquam nisi, a dignissim felis. Nulla placerat vestibulum pulvinar. Nulla facilisi. Donec ante dolor, vulputate in ullamcorper congue, auctor sed purus. Nullam convallis eros et arcu posuere blandit. 
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id molestie metus, et tincidunt leo. Fusce odio purus, tincidunt sit amet semper a, facilisis et magna. Ut vitae tristique urna, nec maximus quam. Mauris vel orci libero. Phasellus eu aliquam nisi, a dignissim felis. Nulla placerat vestibulum pulvinar. Nulla facilisi. Donec ante dolor, vulputate in ullamcorper congue, auctor sed purus. Nullam convallis eros et arcu posuere blandit. 
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id molestie metus, et tincidunt leo. Fusce odio purus, tincidunt sit amet semper a, facilisis et magna. Ut vitae tristique urna, nec maximus quam. Mauris vel orci libero. Phasellus eu aliquam nisi, a dignissim felis. Nulla placerat vestibulum pulvinar. Nulla facilisi. Donec ante dolor, vulputate in ullamcorper congue, auctor sed purus. Nullam convallis eros et arcu posuere blandit. 
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id molestie metus, et tincidunt leo. Fusce odio purus, tincidunt sit amet semper a, facilisis et magna. Ut vitae tristique urna, nec maximus quam. Mauris vel orci libero. Phasellus eu aliquam nisi, a dignissim felis. Nulla placerat vestibulum pulvinar. Nulla facilisi. Donec ante dolor, vulputate in ullamcorper congue, auctor sed purus. Nullam convallis eros et arcu posuere blandit. 
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id molestie metus, et tincidunt leo. Fusce odio purus, tincidunt sit amet semper a, facilisis et magna. Ut vitae tristique urna, nec maximus quam. Mauris vel orci libero. Phasellus eu aliquam nisi, a dignissim felis. Nulla placerat vestibulum pulvinar. Nulla facilisi. Donec ante dolor, vulputate in ullamcorper congue, auctor sed purus. Nullam convallis eros et arcu posuere blandit. 
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id molestie metus, et tincidunt leo. Fusce odio purus, tincidunt sit amet semper a, facilisis et magna. Ut vitae tristique urna, nec maximus quam. Mauris vel orci libero. Phasellus eu aliquam nisi, a dignissim felis. Nulla placerat vestibulum pulvinar. Nulla facilisi. Donec ante dolor, vulputate in ullamcorper congue, auctor sed purus. Nullam convallis eros et arcu posuere blandit. 
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id molestie metus, et tincidunt leo. Fusce odio purus, tincidunt sit amet semper a, facilisis et magna. Ut vitae tristique urna, nec maximus quam. Mauris vel orci libero. Phasellus eu aliquam nisi, a dignissim felis. Nulla placerat vestibulum pulvinar. Nulla facilisi. Donec ante dolor, vulputate in ullamcorper congue, auctor sed purus. Nullam convallis eros et arcu posuere blandit. 
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id molestie metus, et tincidunt leo. Fusce odio purus, tincidunt sit amet semper a, facilisis et magna. Ut vitae tristique urna, nec maximus quam. Mauris vel orci libero. Phasellus eu aliquam nisi, a dignissim felis. Nulla placerat vestibulum pulvinar. Nulla facilisi. Donec ante dolor, vulputate in ullamcorper congue, auctor sed purus. Nullam convallis eros et arcu posuere blandit. 
        </p>
    </div>
    );
}

export default ModalPage;