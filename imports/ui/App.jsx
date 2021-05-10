
import React from "react";

let ZoomMtg = window.ZoomMtg
// let ZoomMtg
// var ZoomMtg
//ZoomMtg.setZoomJSLib("https://jssdk.zoomus.cn/1.9.0/lib", "/av"); 

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.1/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();


export function App() {

  let apiKey = ""
  let apiSecret = ""

  var leaveUrl = 'http://localhost:3000'
  var userName = 'React'
  var userEmail = 'tepx24@gmail.com'


  function getSignature() {
    let meetingNumber = '82103882786'
    let passWord = '62LrY1'
    let role = 0
  
    let signature = ZoomMtg.generateSignature({ apiKey, apiSecret, meetingNumber, role })

    startMeeting({ signature, apiKey, meetingNumber, passWord })
  }


  function startMeeting({ signature, apiKey, meetingNumber, passWord }) {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)
        console.log(ZoomMtg.checkSystemRequirements())
        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  return (
    <div className="App">
      <main>
        <h1>Zoom WebSDK Sample React</h1>

        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );

  // useEffect(() => {

  //   let meetingNumber = 81785884835
  //   let passCode = "g8AST4"

  //   Meteor.call('zoom.generateSignature',{
  //     "meetingNumber": meetingNumber,
  //     "role": 0
  //   },((err,res)=>{
  //     console.log("ZOOM")
  //     if(err){
  //         console.log(err)
  //     }else{
  //         console.log("SIGNATURE OK")
  //         console.log(res)

  //         let {signature,apiKey} = res

  //               let userName = "New Test"
  //               let userEmail = "tepx24@gmail.com"
  //               let leaveUrl = "http://localhost:3000"

  //               let _this = this
  //               setTimeout(()=>{
  //                   console.log("INIT ZOOM MEETING")
  //                   console.log(ZoomMtg)
  //                   console.log(ZoomMtg.getWebSDKVersion())
  //                   console.log(ZoomMtg.getZoomJSLib())
  //                   console.log(ZoomMtg.checkSystemRequirements())
  //                   ZoomMtg.init({
  //                       leaveUrl: leaveUrl,
  //                       isSupportAV: true,
  //                       success: function() {
  //                           console.log("ZOOM INIT SUCCESS")
  //                           setTimeout(()=>{
  //                               console.log("JOIN MEETING")
  //                                ZoomMtg.join({
  //                               signature: signature,
  //                               meetingNumber: meetingNumber,
  //                               userName: userName,
  //                               apiKey: apiKey,
  //                               userEmail: userEmail,
  //                               passWord: passCode,
  //                               success: (success) => {
  //                                   console.log("JOIN ZOOM SUCCESS")
  //                                 console.log(success)
  //                               },
  //                               error: (error) => {
  //                                   console.log("ERROR ZOOM JOIN")
  //                                 console.log(error)
  //                               }
  //                             })	
  //                           },5000)

  //                       }
  //                   })
  //               },5000)
  //     }
  //   }))

  // }, []);

  //return <div className="App">Zoom Testing</div>;
}