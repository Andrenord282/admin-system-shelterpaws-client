import { FC } from 'react';
import './HomePage.scss';

const HomePage: FC = () => {
    return (
        <main className="home-section section">
            <div className="home-section__container container">
                <div className="home-section__content">
                    <p>home page is private</p>
                </div>
            </div>
        </main>
    );
};

export { HomePage };
