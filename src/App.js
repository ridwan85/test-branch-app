import React, { useEffect } from 'react';
// import branch from 'branchio-sdk';
import { newTracker, trackPageView } from '@snowplow/browser-tracker';

import uuid from 'random-uuid-v4'

function App() {
  useEffect(() => {
    if (window.branch) {
      window.branch.init('key_test_hlYYDeatflVtcZkMNshFpjanEFiaolWB', function(err, data) {
        if (err) {
          console.error('Error from Branch: ' + err);
          return;
        }
        
        const user_id = uuid();
        // Track user journey
        window.branch.setIdentity(user_id, function(err, data) {
          if (err) {
            console.error('Branch setIdentity error', err);
          } else {
            console.log('Branch setIdentity success', data);
          }
        });

        const source = data['~channel'];
        console.log('User source:', source);
    
        // Track KYC completion
        window.branch.userCompletedAction('kyc_completed');

        // data will include link data, metadata, etc.
        // data['~referring_link'] is the original referring link
        // data['+click_timestamp'] is when the click occurred
        // data['+is_first_session'] indicates whether this is the first session (install) or any other session (open)

        console.log(data);
      });
    }
    // // Initialize Branch
    // branch.init(`key_live_kAbaGQZJuRLc7MeRgAffJbogDEfT4T3z`, function(err, data) {
    //   if (err) {
    //     console.error('Branch init error', err);
    //   } else {
    //     console.log('Branch init success', data);
    //   }
    // });
    
    // Initialize Snowplow
    newTracker('sp1', 'collector_url', { appId: 'my-app', platform: 'web' });
    trackPageView();
   
  }, []);

  return (
    <div className="App">
      {/* Your app content */}
      <h1>Testing NEX app branchio integration</h1>
    </div>
  );
}

export default App;
