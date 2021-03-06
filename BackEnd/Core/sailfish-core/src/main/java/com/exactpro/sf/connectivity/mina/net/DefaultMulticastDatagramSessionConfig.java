/******************************************************************************
 * Copyright 2009-2018 Exactpro (Exactpro Systems Limited)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/
package com.exactpro.sf.connectivity.mina.net;

import org.apache.mina.transport.socket.DefaultDatagramSessionConfig;

public class DefaultMulticastDatagramSessionConfig extends
		DefaultDatagramSessionConfig 
{
	private static int DEFAULT_SOTIMEOUT = 1000;
	
	private int soTimeout = DEFAULT_SOTIMEOUT;
	
	public int getSoTimeout() {
		return soTimeout;
	}

	
	public void setSoTimeout(int soTimeout) {
		this.soTimeout = soTimeout;
	}
	
}
