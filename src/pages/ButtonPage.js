import { GoBell,GoCloudUpload,GoDatabase } from 'react-icons/go';
import Button from "../components/Button";

function ButtonPage() {
    const handleClick = () => {}
    return (
    <div>
        <div>
            <Button outline success rounded onClick={handleClick} className="mb-5">
                <GoBell />
                Click me !
            </Button>
        </div>
        <div>
            <Button danger outline onMouseEnter={handleClick}>
                <GoCloudUpload/>
                Buy now !
            </Button>
        </div>
        <div>
            <Button warning>
                <GoDatabase/>
                Sea Deal !
            </Button>
        </div>
        <div>
            <Button secondary outline>Hide Ads !</Button>
        </div>
        <div>
            <Button primary rounded>Something !</Button>
        </div>
    </div>)
}

export default ButtonPage;