from ai_core_sdk.ai_core_v2_client import AICoreV2Client
from gen_ai_hub.proxy.langchain.openai import ChatOpenAI
import os

os.environ['AICORE_AUTH_URL'] = "https://cloudfoundry.authentication.us10.hana.ondemand.com/oauth/token"
os.environ['AICORE_CLIENT_ID'] = "sb-dcfbb046-534e-4342-9469-27bbbe52313a!b617|aicore!b164"
os.environ['AICORE_RESOURCE_GROUP'] = 'default'
os.environ['AICORE_CLIENT_SECRET'] = "e2554f6a-29da-4f82-9d66-743fd8eb9905$FO7P2dJlFFGNATLFcf8QbWGR-wl_dBzngIvVg77X6GM="
os.environ['AICORE_BASE_URL'] ='https://api.ai.prod.us-east-1.aws.ml.hana.ondemand.com' + "/v2"

from gen_ai_hub.proxy.native.openai import embeddings

base_url = os.environ.get('AICORE_BASE_URL')
auth_url = os.environ.get('AICORE_AUTH_URL')
client_id = os.environ.get('AICORE_CLIENT_ID')
client_secret = os.environ.get('AICORE_CLIENT_SECRET')

if base_url is None:
    raise ValueError("Environment variable AICORE_BASE_URL is not set.")
auth_url = os.environ.get('AICORE_AUTH_URL')
if auth_url is None:
    raise ValueError("Environment variable AICORE_AUTH_URL is not set.")
client_id = os.environ.get('AICORE_CLIENT_ID')
if client_id is None:
    raise ValueError("Environment variable AICORE_CLIENT_ID is not set.")
client_secret = os.environ.get('AICORE_CLIENT_SECRET')
if client_secret is None:
    raise ValueError("Environment variable AICORE_CLIENT_SECRET is not set.")

ai_core_client = AICoreV2Client(
    base_url= base_url,
    auth_url=auth_url,
    client_id=client_id,
    client_secret=client_secret
)

llm = ChatOpenAI(proxy_model_name='gpt-4o', max_tokens=4000)
llm.invoke("You are a finance expert. Only answer finance quesitons.").content

def call_llm(prompt):
    response = llm.invoke(prompt).content
    return response