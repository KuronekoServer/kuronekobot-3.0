module.exports = async(queue, client) => {
    return client.say.queueMessage(client, queue, "VCから強制切断されたため、再生を停止します。", "RED");
  };