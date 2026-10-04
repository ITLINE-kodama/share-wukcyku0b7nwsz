let language='ja';
const menu=document.querySelector('.menu'),nav=document.querySelector('#navigation');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label',language==='ja'?'メニューを開く':'Open menu')}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',language==='ja'?(open?'メニューを閉じる':'メニューを開く'):(open?'Close menu':'Open menu'))});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const details={
academy:['Learn the beauty.','エスティシャンの学びや日本からの留学について、ご相談いただけます。詳しいコース案内は今後制作する下層ページに掲載予定です。','Explore esthetics education and studying in Hawai‘i. Detailed program pages are planned for the full website.'],
salon:['Feel the beauty.','手によるケアを大切にするHICAのサロン体験。こちらは記事の掲載イメージです。施術内容・予約については公式予約ページをご確認ください。','Experience HICA’s approach to hands-on care. This is an editorial sample. See our official booking page for treatments and reservations.'],
retreat:['An island state of mind.','ハワイの自然とウェルネスに触れるリトリート。企画書に基づく紹介イメージです。ツアーの詳細・開催日程は未掲載です。運営：TMORI, LLC。','A retreat inspired by Hawai‘i’s nature and wellness. This is a concept preview; itineraries and dates are not yet listed. Operated by TMORI, LLC.'],
shop:['Everyday, a little aloha.','サロンで出会ったケアを日常へ。オンラインストアの紹介イメージです。商品・価格・販売機能は今後の制作対象です。','Bring your salon care into everyday life. This is an online store concept. Products, pricing and purchasing are planned for the full website.'],
cart:['Your shopping bag.','カートの配置イメージです。このTOPデザイン案では商品購入・決済は行えません。オンラインストアの構築時に接続します。','Shopping bag preview. Purchases and payments are not available in this TOP page concept. The bag will connect to the future online store.'],
campaigns:['News & campaigns.','新着・キャンペーン一覧への入口です。現在の3件はレイアウト確認用の見本で、募集中の企画や割引ではありません。公開時に実際の内容・期間を設定します。','The entry point for news and campaigns. These three cards are layout samples, not active offers or discounts. Actual content and dates will be added for launch.'],
'campaign-school':['A new beginning.','スクール向け新着・キャンペーンの掲載見本です。内容・期間・特典は未確定のため、実施中の募集や特典を示すものではありません。','A layout sample for academy news and campaigns. Content, dates and benefits are not confirmed; this is not an active promotion.'],
'campaign-salon':['A moment for you.','サロン向け新着・キャンペーンの掲載見本です。施術内容・期間・特典は未確定です。通常のご予約は公式予約ページへお進みください。','A layout sample for salon news and campaigns. Treatments, dates and benefits are not confirmed. For regular appointments, visit the official booking page.'],
'campaign-retreat':['Follow the island.','リトリート向け新着・キャンペーンの掲載見本です。ツアー内容・日程・特典は未確定です。運営：TMORI, LLC。','A layout sample for retreat news and campaigns. Itineraries, dates and benefits are not confirmed. Operated by TMORI, LLC.'],
notice:['From HICA.','スクール・サロンからのお知らせの表示見本です。営業案内やスクール情報など、実際のお知らせは公開時に掲載します。','A sample announcement from the academy and salons. Actual school and business updates will be published at launch.'],
social:['Little moments.','Instagramフィードのレイアウト見本です。写真は実際のSNS投稿ではありません。正式なアカウントと接続方法の確認後、投稿を連携します。','An Instagram feed layout preview. These images are not actual social posts. Live posts will be connected after the official accounts and integration are confirmed.'],
'instagram-school':['Instagram · HICA','HICAのInstagramへの入口です。正式なアカウントURLの確認後に接続します。現在はデザイン上の配置見本です。','An entry point for HICA’s Instagram. This is a layout preview; the link will be connected once the official account URL is confirmed.'],
'instagram-salon':['Instagram · Salons','サロンのInstagramへの入口です。正式なアカウントURLの確認後に接続します。現在はデザイン上の配置見本です。','An entry point for the salon’s Instagram. This is a layout preview; the link will be connected once the official account URL is confirmed.'],
facebook:['Facebook · HICA','HICAのFacebookへの入口です。正式なアカウントURLの確認後に接続します。現在はデザイン上の配置見本です。','An entry point for HICA’s Facebook. This is a layout preview; the link will be connected once the official account URL is confirmed.']
};
const dialog=document.querySelector('#detail');let activeDetail=null;
function renderDetail(){if(!activeDetail)return;const entry=details[activeDetail];document.querySelector('#detail-title').textContent=entry[0];document.querySelector('#detail-body').textContent=entry[language==='ja'?1:2]}
document.querySelectorAll('[data-detail]').forEach(b=>b.addEventListener('click',()=>{activeDetail=b.dataset.detail;renderDetail();dialog.showModal()}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());document.querySelector('#detail-link').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
const textNodes=[];const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
while(node=walker.nextNode()){if(['SCRIPT','STYLE'].includes(node.parentElement.tagName))continue;const key=node.nodeValue.trim();if(translations[key])textNodes.push({node,ja:node.nodeValue,en:node.nodeValue.replace(key,translations[key])})}
const attributes=[];document.querySelectorAll('[alt],[aria-label]').forEach(el=>{for(const name of ['alt','aria-label']){const ja=el.getAttribute(name);if(ja&&translations[ja])attributes.push({el,name,ja,en:translations[ja]})}});
function setLanguage(lang){language=lang;document.documentElement.lang=lang;textNodes.forEach(item=>{item.node.nodeValue=item[lang]});attributes.forEach(item=>item.el.setAttribute(item.name,item[lang]));document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));document.querySelector('meta[name="description"]').content=lang==='ja'?'Hawaii Cosmetology Academy TOPページ・Codex作成デザイン案。Learn it. Experience it.':'Hawaii Cosmetology Academy — TOP page design concept by Codex. Learn it. Experience it.';closeMenu();renderDetail()}
document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
