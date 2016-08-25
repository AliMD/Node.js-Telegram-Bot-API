import TelegramBotApiEvent from './events';
/**
 * @class TelegramBotApi
 */
export default class TelegramBotApi extends TelegramBotApiEvent {
    /**
     * Create a TelegramBotApi
     * @param {string} token
     * @param {Object} options
     */
    constructor(token?: string, options?: {
        gzip?: boolean;
        autoChatAction?: boolean;
        autoChatActionUploadOnly?: boolean;
        autoUpdate?: boolean;
        updateInterval?: number;
        updateLimit?: number;
        updatePoolingTimeout?: number;
    });
    /**
     * Array of onMessage listeners
     * @private
     */
    private _onMsgListenerArray;
    /**
     * last _onMsgListenerArray item.id
     * @private
     */
    private _onMsgLastId;
    /**
     * Make loop on _onMsgListenerArray and if callBackFn return false break the loop
     * @private
     * @param {Function} callBackFn
     */
    private _onMsgListenerLoop(callBackFn);
    /**
     * Check patterns and call listeners
     * called when 'update.message.text' receive
     * @private
     * @param {any} msg
     */
    private _onMsg(msg);
    /**
     * Make 'update.message.text' event on special regular expersion pattern
     * @param {RegExp} pattern
     * @param {Function} listener
     * @return {number} event id
     */
    onMessage(pattern: RegExp, listener: Function): number;
    offMessage(id: number): boolean;
}
