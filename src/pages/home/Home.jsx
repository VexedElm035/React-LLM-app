import { useState, useRef, useEffect } from 'react';
import { Chatbot } from '../../components';
import './home.css';

const Home = () => {
  const [chatbotState, setChatbotState] = useState(0); // 0: closed, 1: open
  const chatbotContainer = useRef(null);
  const toggleChatbot = () => {
    setChatbotState(prev => (prev === 1 ? 0 : 1));
  };
  useEffect(() => {
    if (chatbotContainer.current) {
      chatbotContainer.current.style.transform = chatbotState === 0 ? 'translate(165px,220px) scale(0)' : 'translate(0px, 0px) scale(1)';
    }
   }, [chatbotState]);

  return (   
     <div className="home-container">
      {chatbotState === 0 ? (
        <div className='chat-button'>
          <button onClick={toggleChatbot}>
            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18v-5.5c0 -.667 .167 -1.333 .5 -2" /><path d="M12 7.5c0 -1 -.01 -4.07 -4 -3.5c-3.5 .5 -4 2.5 -4 3.5c0 1.5 0 4 3 4c4 0 5 -2.5 5 -4z" /><path d="M4 12c-1.333 .667 -2 1.333 -2 2c0 1 0 3 1.5 4c3 2 6.5 3 8.5 3s5.499 -1 8.5 -3c1.5 -1 1.5 -3 1.5 -4c0 -.667 -.667 -1.333 -2 -2" /><path d="M20 18v-5.5c0 -.667 -.167 -1.333 -.5 -2" /><path d="M12 7.5l0 -.297l.01 -.269l.027 -.298l.013 -.105l.033 -.215c.014 -.073 .029 -.146 .046 -.22l.06 -.223c.336 -1.118 1.262 -2.237 3.808 -1.873c2.838 .405 3.703 1.797 3.93 2.842l.036 .204c0 .033 .01 .066 .013 .098l.016 .185l0 .171l0 .49l-.015 .394l-.02 .271c-.122 1.366 -.655 2.845 -2.962 2.845c-3.256 0 -4.524 -1.656 -4.883 -3.081l-.053 -.242a3.865 3.865 0 0 1 -.036 -.235l-.021 -.227a3.518 3.518 0 0 1 -.007 -.215z" /><path d="M10 15v2" /><path d="M14 15v2" />
            </svg>
          </button>
        </div>
      ) : (
        <div className='chat-float-container' ref={chatbotContainer}>
          <Chatbot isActive={() => setChatbotState(0)}/>
        </div>
      )}
          
      <header className="home-header">
        <h1>Welcome to Lorem Ipsum</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa erat at dui.
        </p>
        <button className="home-btn">Get Started</button>
      </header>

      <section className="home-features">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Feature One</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae velit ex.</p>
          </div>
          <div className="feature-card">
            <h3>Feature Two</h3>
            <p>Maecenas sit amet tincidunt elit. Etiam nec magna at urna dictum placerat.</p>
          </div>
          <div className="feature-card">
            <h3>Feature Three</h3>
            <p>Curabitur ac lacus arcu. Sed vehicula varius lectus auctor viverra.</p>
          </div>
        </div>
      </section>

      <section className="home-about">
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac ex nec ipsum ultrices eleifend. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa erat at dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        </p>
      </section>

      <section className="home-gallery">
        <h2>Gallery</h2>
        <div className="gallery-grid">
          <img src="https://picsum.photos/200/150?random=1" alt="Gallery 1" />
          <img src="https://picsum.photos/200/150?random=2" alt="Gallery 2" />
          <img src="https://picsum.photos/200/150?random=3" alt="Gallery 3" />
          <img src="https://picsum.photos/200/150?random=4" alt="Gallery 4" />
        </div>
      </section>

      <section className="home-contact">
        <div>
          <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit">Send</button>
        </form>
        </div>
        <div>
          <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit">Send</button>
        </form>
        </div>
        <div>
          <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit">Send</button>
        </form>
        </div>
        <div>
          <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit">Send</button>
        </form>
        </div>
        

        
      </section>
      

      <footer className="home-footer">
        <p>&copy; 2025 Lorem Ipsum. All rights reserved.</p>
      </footer>
    </div>
  
  );
};

export default Home;