const axios = require('axios');

async function test(){
  const response = await axios.post(
  'https://edith.xiaohongshu.com/api/sns/web/v1/login/activate',
  {},
  {
      headers: {
          // 'authority': 'edith.xiaohongshu.com',
          // 'accept': 'application/json, text/plain, */*',
          // 'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
          // 'content-type': 'application/json;charset=UTF-8',
          'cookie': 'abRequestId=73fe65b1-0ca3-54e2-9356-920097cf5aaa; xsecappid=xhs-pc-web; webBuild=4.4.0; a1=18e0ca11023zjyitoxxw5chq0dzdjt9dbawsueza630000323768; webId=2156d0fe28777c1a0e1d4257be50f8c9; gid=yYd8S0yy40DJyYd8S0yy80duJquVv39lCCE2E0KSxA8fuMq8fV9jf7888qJqWKY8ij0S042f; unread={%22ub%22:%2265da95c6000000000b01bd6d%22%2C%22ue%22:%2265ce5dc5000000000700799c%22%2C%22uc%22:31}; websectiga=9730ffafd96f2d09dc024760e253af6ab1feb0002827740b95a255ddf6847fc8; sec_poison_id=c123490a-5eca-4050-972e-687209ddc140',
          // 'origin': 'https://www.xiaohongshu.com',
          // 'referer': 'https://www.xiaohongshu.com/',
          // 'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Microsoft Edge";v="122"',
          // 'sec-ch-ua-mobile': '?0',
          // 'sec-ch-ua-platform': '"macOS"',
          // 'sec-fetch-dest': 'empty',
          // 'sec-fetch-mode': 'cors',
          // 'sec-fetch-site': 'same-site',
          // 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0',
          // 'x-b3-traceid': '8a9dad2af87d7c8b',
          'x-s': 'XYW_eyJzaWduU3ZuIjoiNTEiLCJzaWduVHlwZSI6IngxIiwiYXBwSWQiOiJ4aHMtcGMtd2ViIiwic2lnblZlcnNpb24iOiIxIiwicGF5bG9hZCI6IjM0ODc4M2Y2MzhiYmRiN2MxNDhiMDMxYTdkZjRhMGI0ZmRhNzZjMjQ0YTE0YmNiMmYzN2NlOTVmYWMxOTdhYTI2YzY1MGE1ZmQwNTg3MmVjNTBkODdkOWEzYzYxMWYwNGM5ZTNiZmRhMWZhYTFlYjkwZDc0YWEzMWI1NGM3MmNkMGQ3NGFhMzFiNTRjNzJjZGFjNDg5YjlkYThjZTVlNDhmNGFmYjlhY2ZjM2VhMjZmZTBiMjY2YTZiNGNjM2NiNWRiNzE3MzBjZDVhMTI1YzJjYjY1YTYxZTAyZmU5ZmFjYzVkNjI2YTkwYmVlNDVkMGIxY2M3ODA3NWY4MzVlYTgxODY1ZjgxNjRjNjQyNDBiMzk1NWQ5NGViZDMzYmY3ZmZjNTA0MzI1ZTk3ZTBiMTc5ZDY3NTM4MjRmZTM2ZjRlNjkyNjIzZGZkZGQyMDEzOTRmY2NlZDEyZWQxYWI2YWM2N2ZkZDkxYjE3ZmI2ZGY3NGFhNmJhODg4ZjAyODIyNSJ9',
          'x-s-common': '2UQAPsHCPUIjqArjwjHjNsQhPsHCH0rjNsQhPaHCH0P1+jhhHjIj2eHjwjQ+GnPW/MPjNsQhPUHCHdYiqUMIGUM78nHjNsQh+sHCH0c1+shIHjIj2eLjwjHlwBLIG9rlP/ZUP7kx2nSFJ7Yh4Ap0yorI8okDydcE8BQY47+M8gkY+0PIPeZIPAHA+AGhHjIj2eGjw0r7PeD9P/PE+0cIPAGVHdW7H0ijnbSgg9pEadkYp9zMp/+y4LSxJ9Swprpk/r+t2fbg8opnaBl7nS+Q+DS187YQyg4knpYs4M+gLnSOyLiFGLY+4B+o/gzDPS8kanS7ynPUJBEjJbkVG9EwqBHU+BSOyLShanS7yn+oz0pjzASinD+Q+DSx//mOzBPF//Q8PDMCyBS8JpQk/0Q+2rEryBS+zrMhnpzDyMkxLfY+zFDInfMayrECnfk+ySrInpzbPbST/fS+JpSC/0QwJrRLpfM8pFMh/MzDybSLa/Q82SDl/L4bPpkTLg4wpBqA/nMnyDELcfTOzBz3/M4b2SSCngY+pMS7/D4++pkL/fSyJpQi/p4yybSLzfl8yfT7nDz0PbSgzgk+pFDl/D4+PFMT/fT+zMrA/D4ByrMCzfSwpbQx/dktySkozfkwzBqMnnkVyMSLyBkypb8V/DziJLEozfM8yflin/QyyDFUpfY+ySkTnSzsyLMxn/Q8pbkk/D4wyDFU/fSwpMQk/dkbPFMCcfkyzb8i/pzQPpSCafk8ySDlnpz82bkLcgSyJpLMnfMBySSCpfTwyDDUnpz34MSTpflwzb83/L4Q2bDU//+OzrrA/S48+rMCpfl8pB4h/Fz8Ppkx87YwySQx/fkz2LErcfS+2fVl/S4z+LEopfSyzrMCnnM8PMkTnfkwprrI/gkQPpkLyA+yprQk/pz0+pkrn/+wprFF/nkaJpkL//QyySQV/fk32LExagkyzMk3nD4z2LMrzgkOpbQTn/QwJbkrzgSypMbhnp4QPSSg//QwPSk3nDz32bSxz/+yJLDUnD48PFEozfYwJLki/Fzd+bkxcgSOzrSE/S+twaHVHdWhH0ija/PhqDYD87+xJ7mdag8Sq9zn494QcUT6aLpPJLQy+nLApd4G/B4BprShLA+jqg4bqD8S8gYDPBp3Jf+m2DMBnnEl4BYQyrkSL9E+zrTM4bQQPFTAnnRUpFYc4r4UGSGILeSg8DSkN9pgGA8SngbF2pbmqbmQPA4Sy9MaPpbPtApQy/8A8BE68p+fqpSHqg4VPdbF+LQfqLkQ4D8j/DlztMkc4A4Q2BzA2op7q0zl4BTQy7Q7anD6q9TyGA+QcFlDa/+O8/mM4BIUcLzyqFIM8Lz/ad+/Lo4GaLp9q9Sn4rkOLoqhcdp78SmI8BpLzb4OagWFpDSk4/8yLo4jadbFPrShaoS6/LbSpdpFpFS94dPlLoz6anS+2DSkyeQA808ALA4i+gQp/7+f4gcFqFFM8p4C+b8PJFkSLM4MzFShN9prqgz0anS6qAml4Blj/BSxLBzIqFDA8BpkqgcAqbq78/bdtAQQybb1aLp+qLE6LemQPM+1qpihwrSk2dpspd4pag8oz0zS+fpDG0pSyM8FcFShcg+f8/+APBzMnDSi+nLAzBY/Lob7zrS3/7PAcDkA+S+Sq9Sl4URU8sRSzop7yDSezD4CcnRSPob7Jok1N7+/4g4ja/PFGFDAtAbUpd4cNM87JDQp4nQlqDRSnnkdq7Yn4B4Qy9zSnnEd8nTQ2dYQzaRApMpN8p4dJnlQz/4A+S87pLS3L9YF4gzUHjIj2eDjw0HUP0cUweDUwsIj2erIH0i7+/QR',
          'x-t': '1709613964036'
      }
  }
  );

  console.log(response.data);
}

test();