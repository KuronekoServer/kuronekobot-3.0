module.exports = async(queue, tracks, client) => {

    queue.metadata.editReply(`曲追加 - ${tracks.length}\n再生ソース ${tracks.source}`).then(async(msg)=>{
        setTimeout(function(){
            msg.delete();
        }, 10000);
    })

};