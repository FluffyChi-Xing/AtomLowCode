// 确保路径匹配实际的 txt 文件结构
const documents = import.meta.glob('./*/index.txt', { eager: true });
console.log('获取document内容', documents);

const homeDoc: Record<string, any> = {}; // 将home下的index.txt文件内容存储到modules中

async function loadTxtContent(filePath: string): Promise<string> {
    const response = await fetch(filePath);
    return await response.text();
}

Object.entries(documents).forEach(async ([key, module]) => {
    // 使用txt所在文件夹的名称作为key
    const docName = key.replace('./', '').replace('/index.txt', '');
    homeDoc[docName] = await loadTxtContent(module.default || module);
})

export default homeDoc;
