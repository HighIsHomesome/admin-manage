package com.accounting.server;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.IoUtil;
import cn.hutool.extra.qrcode.QrCodeUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.http.HttpUtil;
import com.accounting.server.service.IAccountService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ServerApplicationTests {

	@Value("${APPID}")
	private String APPID;
	@Value("${APP_SECRET}")
	private String APP_SECRET;

	@Test
	void contextLoads() {
	}
	@Autowired
	private IAccountService iAccountService;
	@Test
	public void test(){
		System.out.println("test");
	}

	@Test
	public void getAccessToken(){
		String json = "{" +
				"\"scence\":\"23\","+
				"\"page\":\"pages/index/main\""+
				"}";
//		String accessToken = HttpUtil.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+APPID+"&secret="+APP_SECRET);
//		System.out.println(accessToken);
		String url = "https://api.weixin.qq.com/shop/funds/qrcode/gen?access_token=57_C1SDpAC-tKFs1f6w9EGhIXHZ_23h_t1F1NRbeDFZzaqmq8TLcnN3FXY4NRPaqiq_pa5HIBGEqwr8VftS1c-_3adfFoGygf766zV9CTBYYrx-2aGB6X58pMCjvm8XjtS3k-RHsu5RT4-oaul5VGMeAFAITZ";
		System.out.println(url);
		HttpResponse execute = HttpRequest.post(url).body(json).execute();
		System.out.println(execute);
		byte[] bytes = execute.bodyBytes();
//		IoUtil.write(FileUtil.getOutputStream("/Users/shenli/Desktop/qrCode.jpg"),true,bytes);
//		QrCodeUtil.generate("www.baidu.com",300,300,FileUtil.file("/Users/shenli/1.png"));

	}

}
