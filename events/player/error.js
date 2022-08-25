module.exports = async(queue, error, client) => {

    client.say.queueMessage(client, queue, "再生中にエラーが発生しました。", "RED");

    return client.utils.sendErrorLog(client, { stack: `${error.message}`, name: "PLAYER_ERROR", code: `${queue.id}` }, "error");
};