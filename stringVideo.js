const BL = 8; //视频流畅度，越大越流畅，越小越清晰
const gRate = 1.5; //灰度比例
const SCALE = 1; //canvas大小缩放
const TEXT = '6'; //视频字符
const FONT = '17px serif'; //字符样式
let $timer = null;
const init = () => {
    const video = document.querySelector('video') || document.querySelector('canvas');
    const style = `position: absolute;top: 0;right: 0;background: #CCC; transform: scale(${SCALE});z-index: 100000`;
    let cvs = document.getElementById('wangcan-cvs');
    let cvs2 = document.getElementById('wangcan-cvs2');
    cvs && cvs.remove();
    cvs2 && cvs2.remove();
    cvs = document.createElement('canvas');
    cvs2 = document.createElement('canvas');
    cvs.width = cvs2.width = video.offsetWidth;
    cvs.height = cvs2.height = video.offsetHeight;
    cvs2.style = style;
    cvs.id = 'wangcan-cvs';
    cvs2.id = 'wangcan-cvs2';
    document.body.appendChild(cvs2);
    const ctx = cvs.getContext('2d');
    const ctx2 = cvs2.getContext('2d');
    const palyVideo = () => {
        $timer = requestAnimationFrame(function fn(){
            const { width, height } = cvs;
            ctx.drawImage(video, 0, 0, width, height);
            const data = ctx.getImageData(0, 0, width, height).data;
            ctx2.clearRect(0, 0, width, height);
            ctx2.font = FONT;
            for (let i = 0; i < data.length; i += 4 * BL) {
                const x = parseInt((i + i) % (width * 8) / 8);
                const y = parseInt(i / (width * 4));
                if (x % BL === 0 && y % BL === 0) {
                    const g = parseInt((data[i] + data[i + 1] + data[i + 2]) / gRate);
                    ctx2.fillStyle = `rgb(${g}, ${g}, ${g}, ${data[i + 3]})`;
                    ctx2.fillText(TEXT, x, y);
                }
            }
            requestAnimationFrame(fn);
        })
    }
    cancelAnimationFrame($timer);
    palyVideo();
}


try {
    init();
} catch (e) {
    cancelAnimationFrame($timer);
    throw e;
}

