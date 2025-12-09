require "eth"
require "dotenv/load"

puts "🚀 Ruby Web3 Template"

rpc = ENV["RPC_URL"]
private_key = ENV["PRIVATE_KEY"]

raise "❌ RPC_URL não configurado" unless rpc
raise "❌ PRIVATE_KEY não configurada" unless private_key

client = Eth::Client.create rpc

key = Eth::Key.new priv: private_key
address = key.address

puts "📌 Sua carteira: #{address}"
puts "⏳ Consultando saldo..."

balance = client.get_balance(address)
eth = balance.to_i / (10**18).to_f

puts "💰 Saldo: #{eth} ETH"
