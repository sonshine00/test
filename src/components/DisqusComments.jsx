import React, { useEffect } from 'react';

const DisqusComments = ({ url, identifier, title }) => {
  useEffect(() => {
    // Reset Disqus if it's already loaded, or load it for the first time
    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.url = url;
          this.page.identifier = identifier;
          this.page.title = title;
          this.language = 'ko'; // You can dynamically set this if needed
        }
      });
    } else {
      // Set config variables before loading the script
      window.disqus_config = function () {
        this.page.url = url;
        this.page.identifier = identifier;
        this.page.title = title;
      };

      // Create and append the script
      const d = document, s = d.createElement('script');
      s.src = 'https://moneymany.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    }
  }, [url, identifier, title]);

  return (
    <div className="disqus-container highlight-card" style={{ marginTop: '3rem', width: '100%', boxSizing: 'border-box' }}>
      <div id="disqus_thread"></div>
      <noscript>
        Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </div>
  );
};

export default DisqusComments;
