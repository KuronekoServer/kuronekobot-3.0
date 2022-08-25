
module.exports = async(queue, client) => {

      return client.say.queueMessage(client, queue, "再生待ちをすべて再生しました！");
};
