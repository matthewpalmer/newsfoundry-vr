function speakText(text) {
	var voices = [];

    voices = window.speechSynthesis.getVoices();

    console.log('Get voices ' + voices.length.toString());

    for(var i = 0; i < voices.length; i++ ) {
        console.log("Voice " + i.toString() + ' ' + voices[i].name);
    }
    // var u1 = new SpeechSynthesisUtterance('AUCTIONS in Knox suburbs have again delivered strong results to vendors. The clearance rate hit 97 per cent from 30 auctions for the week ending November 20, according to CoreLogic.\n\n');

	var u1 = new SpeechSynthesisUtterance(text);

    // u1.lang = 'en-US';
    // u1.pitch = 1;
    // // u1.rate = 1;
    // u1.voice = voices[10];
    // u1.voiceURI = 'native';
    // u1.volume = 1;
    
    window.speechSynthesis.speak(u1);
}