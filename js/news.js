const imageUrls = [
    'assets/bg/bg-1.png',
    'assets/bg/bg-2.png',
    'assets/bg/bg-3.png',
    'assets/bg/bg-4.png',
    'assets/bg/bg-5.png',
    'assets/bg/bg-6.png',
    'assets/bg/bg-7.png',
    'assets/bg/bg-8.png',
    'assets/bg/bg-9.png',
    'assets/bg/bg-10.png',
    'assets/bg/bg-11.png',
    'assets/bg/bg-12.png',
    'assets/bg/bg-13.png',
    'assets/bg/bg-14.png',
    'assets/bg/bg-15.png',
    'assets/bg/bg-16.png',
    'assets/bg/bg-17.png'
];

const slideshow = document.getElementById('slideshow');

imageUrls.forEach((url, index) => {
const img = document.createElement('img');
img.src = url;
if (index === 0) img.classList.add('active');
slideshow.appendChild(img);
});

let current = 0;
const slides = document.querySelectorAll('#slideshow img');

setInterval(() => {
slides[current].classList.remove('active');
current = (current + 1) % slides.length;
slides[current].classList.add('active');
}, 4000);


// NEWS TWITTER
const twitterPost = [
    `<blockquote class="twitter-tweet" data-lang="en" data-theme="dark">
      <p lang="ja" dir="ltr">
        1日1回10連無料（最大5回）！地元素URハントレスーネロが再登場！<br><br>
        天命祈願イベントにてハントレスーネロを入手可能！ネロの出現率は1.28％、ネロ欠片*1の出現率は10%！<br><br>
        ■開催期間：<br>4月21日（月）5：01～4月26日（土）4：00<br><br>
        ■CV：米澤円
        <a href="https://twitter.com/hashtag/%E3%83%89%E3%83%A9%E3%82%AC%E3%83%AB%E3%82%BA?src=hash&ref_src=twsrc%5Etfw">#ドラガルズ</a>
        <a href="https://t.co/pnArmR286a">pic.twitter.com/pnArmR286a</a>
      </p>
      &mdash; 【公式】ドラゴンとガールズ交響曲（ドラガルズ） (@dragongirls_jp)
      <a href="https://twitter.com/dragongirls_jp/status/1913151416589529432?ref_src=twsrc%5Etfw">April 18, 2025</a>
    </blockquote>`,
    `<blockquote class="twitter-tweet" data-lang="en" data-theme="dark"><p lang="ja" dir="ltr">1日1回10連無料（最大5回）！地元素URハントレスーセトが再登場！<br><br>天命祈願イベントにてハントレスーセトを入手可能！セトの出現率は1.28％、セト天命欠片*1の出現率は10%！<br><br>■開催期間：<br>4月25日（金）5：01～4月30日（水）4：00<br><br>■CV：中原麻衣<a href="https://twitter.com/hashtag/%E3%83%89%E3%83%A9%E3%82%AC%E3%83%AB%E3%82%BA?src=hash&amp;ref_src=twsrc%5Etfw">#ドラガルズ</a> <a href="https://t.co/jdmyCMAlEk">pic.twitter.com/jdmyCMAlEk</a></p>&mdash; 【公式】ドラゴンとガールズ交響曲（ドラガルズ） (@dragongirls_jp) <a href="https://twitter.com/dragongirls_jp/status/1913159289893732402?ref_src=twsrc%5Etfw">April 18, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`
  ];
  
  const adultPost = [
    {
      "ss-id": "1AuONMvkplfcSNp4ELm35vm0vCcMZsCqR",
      "text": `1日1回10連無料（最大5回）！コペルニクスがMRに超臨界可能！
        SSR＆URコペルニクスのガチャイベントも同時開催！
        星輝召喚にてMRハントレス欠片*100の出現率は1.28％！
        
        ■開催期間:
        4/23（水）5：01～4/28（月）4：00
        ■CV：伊藤静
        #ドラガルズ`
    },
  ];
  
  function insertAllPosts() {
    const container = document.querySelector('.twitter-news');
  
    const gridWrapper = document.createElement('div');
    gridWrapper.className = 'twitter-grid';
  
    // Twitter Posts
    twitterPost.forEach(post => {
      const div = document.createElement('div');
      div.className = 'twitter-card';
      div.innerHTML = post;
      gridWrapper.appendChild(div);
    });
  
    // Adult Posts
    adultPost.forEach(post => {
      // Lewatkan post kosong
      if (!post.text.trim() && !post["ss-id"].trim()) return;
  
      const div = document.createElement('div');
      div.className = 'twitter-card adult-card';
      div.innerHTML = `
        <p>${post.text.replace(/\n/g, "<br>")}</p>
        ${post["ss-id"].trim() ? `<iframe src="https://drive.google.com/file/d/${post["ss-id"]}/preview" allow="autoplay"></iframe>` : ""}
      `;
      gridWrapper.appendChild(div);
    });
  
    container.appendChild(gridWrapper);
  
    // Load Twitter script jika perlu
    if (window.twttr && window.twttr.widgets) {
      twttr.widgets.load();
    } else {
      const twitterScript = document.createElement('script');
      twitterScript.setAttribute('async', '');
      twitterScript.setAttribute('src', 'https://platform.twitter.com/widgets.js');
      document.body.appendChild(twitterScript);
    }
  }
  
  insertAllPosts();
  